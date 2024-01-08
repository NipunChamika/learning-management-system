import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/typeorm/entities/course.entity';
import { Program } from 'src/typeorm/entities/program.entity';
import { CreateCourseParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,

    @InjectRepository(Program)
    private programRepository: Repository<Program>,
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
}
