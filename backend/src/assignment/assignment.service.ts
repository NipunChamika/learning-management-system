import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from 'src/typeorm/entities/assignment.entity';
import { Course } from 'src/typeorm/entities/course.entity';
import {
  CreateAssignmentParams,
  UpdateAssignmentParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,

    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async createAssignment(
    id: number,
    assignmentDetails: CreateAssignmentParams,
  ) {
    const course = await this.courseRepository.findOneBy({ id });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    const existingAssignment = await this.assignmentRepository.findOne({
      where: {
        assignmentTitle: assignmentDetails.assignmentTitle,
        course: { id },
      },
    });

    if (existingAssignment) {
      throw new HttpException(
        'Assignment with the same title already exists in the course',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newAssignment = this.assignmentRepository.create({
      ...assignmentDetails,
      course: course,
    });

    return this.assignmentRepository.save(newAssignment);
  }

  async getAllAssignments(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [assignments, totalCount] =
      await this.assignmentRepository.findAndCount({
        skip: skip,
        take: limit,
        relations: ['course'],
        select: ['id', 'assignmentTitle', 'resourcePath'],
      });

    const totalPages = Math.ceil(totalCount / limit);

    const assignmentData = assignments.map((assignment) => ({
      id: assignment.id,
      assignmentTitle: assignment.assignmentTitle,
      resourcePath: assignment.resourcePath ? assignment.resourcePath : null,
      courseId: assignment.course.id,
    }));

    return {
      data: assignmentData,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
        skip,
      },
    };
  }

  async getAssignmentById(id: number) {
    const assignment = await this.assignmentRepository.findOne({
      where: { id },
      relations: ['course'],
    });

    if (!assignment) {
      throw new HttpException('Assignment not found', HttpStatus.NOT_FOUND);
    }

    const assignmentData = {
      id: assignment.id,
      assignmentTitle: assignment.assignmentTitle,
      resourcePath:
        assignment.resourcePath !== null ? assignment.resourcePath : null,
      courseId: assignment.course.id,
    };

    return assignmentData;
  }

  async updateAssignment(
    id: number,
    updateAssignmentInfo: UpdateAssignmentParams,
  ) {
    const assignment = await this.assignmentRepository.findOneBy({ id });

    if (!assignment) {
      throw new HttpException('Assignment not found', HttpStatus.NOT_FOUND);
    }

    await this.assignmentRepository.update({ id }, { ...updateAssignmentInfo });
  }

  async deleteAssignment(id: number) {
    const assignment = await this.assignmentRepository.findOneBy({ id });

    if (!assignment) {
      throw new HttpException('Assignment not found', HttpStatus.NOT_FOUND);
    }

    await this.assignmentRepository.softDelete(id);
  }

  async undoDeleteAssignment(id: number) {
    const assignment = await this.assignmentRepository.findOne({
      where: { id },
      relations: ['course'],
      withDeleted: true,
    });

    if (!assignment) {
      throw new HttpException('Assignment not found', HttpStatus.NOT_FOUND);
    }

    if (!assignment.deletedAt) {
      throw new HttpException(
        'Assignment is not deleted',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (assignment.course.deletedAt) {
      throw new HttpException(
        'Corresponding course is deleted',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.assignmentRepository.restore(id);
  }
}
