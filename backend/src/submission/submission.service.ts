import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { mkdirSync, writeFileSync } from 'fs';
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

    const uploadPath = `C:/Users/Nipun/Documents/uploads/submissions/${assignmentId}/${indexNo}`;

    // Ensure the directory exists otherwise create it
    mkdirSync(uploadPath, { recursive: true });

    if (file && file.buffer) {
      const filePath = `${uploadPath}/${file.originalname}`;
      writeFileSync(filePath, file.buffer);
    } else {
      throw new HttpException('File data not provided', HttpStatus.BAD_REQUEST);
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
        submissionDate: (existingSubmission.submissionDate = new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000,
        )),
        submissionCount: 1,
        resourcePath: uploadPath,
      });

      return this.submissionRepository.save(newSubmission);
    } else {
      existingSubmission.submissionDate = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000,
      );
      existingSubmission.submissionCount += 1;

      return this.submissionRepository.save(existingSubmission);
    }
  }
}
