import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from 'src/typeorm/entities/assignment.entity';
import { Student } from 'src/typeorm/entities/student.entity';
import { Submission } from 'src/typeorm/entities/submission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
  ) {}

  async createSubmission(
    assignmentId: number,
    indexNo: number,
    file: Express.Multer.File,
    uploadPath: string,
  ) {
    const student = await this.studentRepository.findOneBy({ indexNo });

    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    const assignment = await this.assignmentRepository.findOneBy({
      id: assignmentId,
    });

    if (!assignment) {
      throw new HttpException('Assignment not found', HttpStatus.NOT_FOUND);
    }

    const existingSubmission = await this.submissionRepository.findOne({
      where: {
        student: { id: student.id },
        assignment: { id: assignmentId },
      },
    });

    if (!existingSubmission) {
      const newSubmission = this.submissionRepository.create({
        student,
        assignment,
        submissionDate: new Date(),
        submissionCount: 1,
        resourcePath: uploadPath,
      });

      return this.submissionRepository.save(newSubmission);
    } else {
      existingSubmission.submissionDate = new Date();
      existingSubmission.submissionCount += 1;

      return this.submissionRepository.save(existingSubmission);
    }
  }
}
