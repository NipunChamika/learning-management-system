import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from 'src/typeorm/entities/program.entity';
import { Student } from 'src/typeorm/entities/student.entity';
import { User } from 'src/typeorm/entities/user.entity';
import {
  CreateStudentInfoParams,
  UpdateStudentInfoParams,
} from 'src/utils/types';
import { In, Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(Program)
    private programRepository: Repository<Program>,
  ) {}

  async createStudentInfo(
    id: number,
    createStudentInfo: CreateStudentInfoParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const programs = await this.programRepository.findBy({
      id: In(createStudentInfo.programIds),
    });

    if (programs.length !== createStudentInfo.programIds.length) {
      throw new HttpException(
        'One or more programs not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newStudentInfo = this.studentRepository.create({
      ...createStudentInfo,
      user: user,
      programs: programs,
    });

    return this.studentRepository.save(newStudentInfo);
  }

  async getAllStudents(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [students, totalCount] = await this.studentRepository.findAndCount({
      skip: skip,
      take: limit,
      relations: ['user', 'program'],
      select: ['id', 'passedAL', 'user', 'programs'],
    });

    const totalPages = Math.ceil(totalCount / limit);

    const studentData = students.map((student) => ({
      studentId: student.id,
      passedAL: student.passedAL,
      userId: student.user.id,
      programIds: student.programs.map((program) => program.id),
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

  async getStudentById(id: number) {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['user', 'program'],
    });

    if (!student) {
      throw new HttpException('Student not found', HttpStatus.BAD_REQUEST);
    }

    // return student;
    return {
      studentId: student.id,
      passedAL: student.passedAL,
      userId: student.user.id,
      programId: student.programs.map((program) => program.id),
    };
  }

  async updateStudentInfo(
    id: number,
    updateStudentInfo: UpdateStudentInfoParams,
  ) {
    const student = await this.studentRepository.findOneBy({ id });

    if (!student) {
      throw new HttpException('Student not found', HttpStatus.BAD_REQUEST);
    }

    await this.studentRepository.update({ id }, { ...updateStudentInfo });
  }

  async deleteStudent(id: number) {
    const student = this.studentRepository.findOneBy({ id });

    if (!student) {
      throw new HttpException('Student not found', HttpStatus.BAD_REQUEST);
    }

    await this.studentRepository.delete(id);
  }
}
