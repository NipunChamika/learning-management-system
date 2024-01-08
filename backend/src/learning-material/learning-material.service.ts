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

  async getAllLearningMaterial(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [learningMaterials, totalCount] =
      await this.learningMaterialRepository.findAndCount({
        skip: skip,
        take: limit,
        relations: ['course'],
        select: ['id', 'materialType', 'resourcePath'],
      });

    const totalPages = Math.ceil(totalCount / limit);

    const learningMaterialData = learningMaterials.map((learningMaterial) => ({
      id: learningMaterial.id,
      materialType: learningMaterial.materialType,
      resourcePath: learningMaterial.resourcePath
        ? learningMaterial.resourcePath
        : null,
      courseId: learningMaterial.course.id,
    }));

    return {
      data: learningMaterialData,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
        skip,
      },
    };
  }
}
