import { Module } from '@nestjs/common';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from 'src/typeorm/entities/submission.entity';
import { Student } from 'src/typeorm/entities/student.entity';
import { Assignment } from 'src/typeorm/entities/assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Submission, Student, Assignment])],
  controllers: [SubmissionController],
  providers: [SubmissionService],
})
export class SubmissionModule {}
