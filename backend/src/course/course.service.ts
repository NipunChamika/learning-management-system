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
}
