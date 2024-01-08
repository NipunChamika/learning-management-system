import { Module } from '@nestjs/common';
import { LearningMaterialController } from './learning-material.controller';
import { LearningMaterialService } from './learning-material.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningMaterial } from 'src/typeorm/entities/learning-material.entity';
import { Course } from 'src/typeorm/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LearningMaterial, Course])],
  controllers: [LearningMaterialController],
  providers: [LearningMaterialService],
})
export class LearningMaterialModule {}
