import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from 'src/typeorm/entities/program.entity';
import { Student } from 'src/typeorm/entities/student.entity';
import { User } from 'src/typeorm/entities/user.entity';
import {
  CreateStudentInfoParams,
  UpdateStudentInfoParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(Program)
    private programRepository: Repository<Program>,
  ) {}

  async createStudentInfo(
    userId: number,
    createStudentInfo: CreateStudentInfoParams,
  ) {
    const user = await this.userRepository.findOneBy({ userId });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const program = await this.programRepository.findOneBy({
      programId: createStudentInfo.programId,
    });

    if (!program) {
      throw new HttpException('Program not found', HttpStatus.BAD_REQUEST);
    }

    const newStudentInfo = this.studentRepository.create({
      ...createStudentInfo,
      user: user,
      program: program,
    });

    return this.studentRepository.save(newStudentInfo);
  }

  async getAllStudents(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [students, totalCount] = await this.studentRepository.findAndCount({
      skip: skip,
      take: limit,
      relations: ['user'],
      select: ['studentId', 'passedAL', 'user'],
    });

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: students,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
        skip,
      },
    };
  }

  async getStudentById(studentId: number) {
    const user = await this.studentRepository.findOneBy({ studentId });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async updateStudentInfo(
    studentId: number,
    updateStudentInfo: UpdateStudentInfoParams,
  ) {
    const user = await this.studentRepository.findOneBy({ studentId });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    await this.studentRepository.update(
      { studentId },
      { ...updateStudentInfo },
    );
  }

  async deleteStudent(studentId: number) {
    const user = this.studentRepository.findOneBy({ studentId });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    await this.studentRepository.delete(studentId);
  }
}
