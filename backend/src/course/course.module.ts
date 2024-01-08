import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/typeorm/entities/course.entity';
import { Program } from 'src/typeorm/entities/program.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Program])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
