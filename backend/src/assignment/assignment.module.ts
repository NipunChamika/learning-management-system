import { Module } from '@nestjs/common';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from 'src/typeorm/entities/assignment.entity';
import { Course } from 'src/typeorm/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, Course])],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
