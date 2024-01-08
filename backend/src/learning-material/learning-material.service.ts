import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/typeorm/entities/course.entity';
import { LearningMaterial } from 'src/typeorm/entities/learning-material.entity';
import { CreateLearningMaterialParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class LearningMaterialService {
  constructor(
    @InjectRepository(LearningMaterial)
    private learningMaterialRepository: Repository<LearningMaterial>,

    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async createLearningMaterial(
    id: number,
    learningMaterialDetails: CreateLearningMaterialParams,
  ) {
    const course = await this.courseRepository.findOneBy({ id });

    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    const newLearningMaterial = this.learningMaterialRepository.create({
      ...learningMaterialDetails,
      course: course,
    });

    return this.learningMaterialRepository.save(newLearningMaterial);
  }
}
