import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from 'src/typeorm/entities/assignment.entity';
import { Course } from 'src/typeorm/entities/course.entity';
import { LearningMaterial } from 'src/typeorm/entities/learning-material.entity';
import { Program } from 'src/typeorm/entities/program.entity';
import { CreateCourseParams, UpdateCourseParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,

    @InjectRepository(Program)
    private programRepository: Repository<Program>,

    @InjectRepository(LearningMaterial)
    private learningMaterialRepository: Repository<LearningMaterial>,

    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
  ) {}

  async createCourse(id: number, courseDetails: CreateCourseParams) {
    const program = await this.programRepository.findOneBy({ id });

    if (!program) {
      throw new HttpException('Program not found', HttpStatus.NOT_FOUND);
    }

    const existingCourse = await this.courseRepository.findOne({
      where: { courseName: courseDetails.courseName, program: { id: id } },
    });

    if (existingCourse) {
      throw new HttpException(
        'Course with the same name already exists in the program',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newCourse = this.courseRepository.create({
      ...courseDetails,
      program: program,
    });

    return this.courseRepository.save(newCourse);
  }

  async getAllCourses(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [courses, totalCount] = await this.courseRepository.findAndCount({
      skip: skip,
      take: limit,
      relations: ['program'],
      select: ['id', 'courseName', 'program'],
    });

    const totalPages = Math.ceil(totalCount / limit);

    const courseData = courses.map((course) => ({
      id: course.id,
      courseName: course.courseName,
      programId: course.program ? course.program.id : null,
    }));

    return {
      data: courseData,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
        skip,
      },
    };
  }

  async getCourseById(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['program'],
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return {
      id: course.id,
      courseName: course.courseName,
      programId: course.program ? course.program.id : null,
    };
  }

  async updateCourse(id: number, updateCourseInfo: UpdateCourseParams) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['assignments'],
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    await this.courseRepository.update({ id }, { ...updateCourseInfo });
  }

  async deleteCourse(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['learningMaterials', 'assignments'],
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    // Soft delete the course
    await this.courseRepository.softDelete(id);

    // Cascade soft delete to learning materials
    if (course.learningMaterials && course.learningMaterials.length > 0) {
      await this.learningMaterialRepository.softDelete(
        course.learningMaterials.map((learningMaterial) => learningMaterial.id),
      );
    }

    // Cascade soft delete to assignments
    if (course.assignments && course.assignments.length > 0) {
      await this.assignmentRepository.softDelete(
        course.assignments.map((assignment) => assignment.id),
      );
    }
  }

  async undoDeleteCourse(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['program', 'learningMaterials', 'assignments'],
      withDeleted: true,
    });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    if (!course.deletedAt) {
      throw new HttpException('Course is not deleted', HttpStatus.BAD_REQUEST);
    }

    if (course.program.deletedAt) {
      throw new HttpException(
        'Corresponding program is deleted',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.courseRepository.restore(id);

    if (course.learningMaterials && course.learningMaterials.length > 0) {
      await this.learningMaterialRepository.restore(
        course.learningMaterials.map((learningMaterial) => learningMaterial.id),
      );
    }

    if (course.assignments && course.assignments.length > 0) {
      await this.assignmentRepository.restore(
        course.assignments.map((assignment) => assignment.id),
      );
    }
  }
}
