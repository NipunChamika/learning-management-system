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
      relations: ['user', 'program'],
      select: ['studentId', 'passedAL', 'user', 'program'],
    });

    const totalPages = Math.ceil(totalCount / limit);

    const studentData = students.map((student) => ({
      studentId: student.studentId,
      passedAL: student.passedAL,
      userId: student.user.userId,
      programId: student.program ? student.program.programId : null,
    }));

    return {
      data: studentData,
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
    const student = await this.studentRepository.findOne({
      where: { studentId },
      relations: ['user', 'program'],
    });

    if (!student) {
      throw new HttpException('Student not found', HttpStatus.BAD_REQUEST);
    }

    // return student;
    return {
      studentId: student.studentId,
      passedAL: student.passedAL,
      userId: student.user.userId,
      programId: student.program ? student.program.programId : null,
    };
  }

  async updateStudentInfo(
    studentId: number,
    updateStudentInfo: UpdateStudentInfoParams,
  ) {
    const student = await this.studentRepository.findOneBy({ studentId });

    if (!student) {
      throw new HttpException('Student not found', HttpStatus.BAD_REQUEST);
    }

    await this.studentRepository.update(
      { studentId },
      { ...updateStudentInfo },
    );
  }

  async deleteStudent(studentId: number) {
    const student = this.studentRepository.findOneBy({ studentId });

    if (!student) {
      throw new HttpException('Student not found', HttpStatus.BAD_REQUEST);
    }

    await this.studentRepository.delete(studentId);
  }
}
