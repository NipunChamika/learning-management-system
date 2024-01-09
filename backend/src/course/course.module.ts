import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/typeorm/entities/course.entity';
import { Program } from 'src/typeorm/entities/program.entity';
import { LearningMaterial } from 'src/typeorm/entities/learning-material.entity';
import { Assignment } from 'src/typeorm/entities/assignment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Program, LearningMaterial, Assignment]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
