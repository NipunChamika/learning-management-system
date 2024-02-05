import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from 'src/typeorm/entities/program.entity';
import { Student } from 'src/typeorm/entities/student.entity';
import { CreateProgramParams, UpdateProrgamParams } from 'src/utils/types';
import { Not, Repository } from 'typeorm';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program)
    private programRepository: Repository<Program>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async createProgram(programDetails: CreateProgramParams) {
    const existingProgramName = await this.programRepository.findOne({
      where: { programName: programDetails.programName },
    });

    if (existingProgramName) {
      throw new HttpException(
        'Program with the same name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingProgramCode = await this.programRepository.findOne({
      where: { programCode: programDetails.programCode },
    });

    if (existingProgramCode) {
      throw new HttpException(
        'Program with the same code already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newProgram = this.programRepository.create(programDetails);

    return this.programRepository.save(newProgram);
  }

  async getAllPrograms(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [programs, totalCount] = await this.programRepository.findAndCount({
      skip: skip,
      take: limit,
      select: ['id', 'programName', 'programCode'],
    });

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: programs,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
        skip,
      },
    };
  }

  async getProgramById(id: number) {
    const program = await this.programRepository.findOneBy({ id });

    if (!program) {
      throw new HttpException('Program not found', HttpStatus.NOT_FOUND);
    }

    return program;
  }

  async updateProgram(id: number, updateProgramInfo: UpdateProrgamParams) {
    const program = await this.programRepository.findOneBy({ id });

    if (!program) {
      throw new HttpException('Program not found', HttpStatus.NOT_FOUND);
    }

    const existingProgramName = await this.programRepository.findOne({
      where: { id: Not(id), programName: updateProgramInfo.programName },
    });

    if (existingProgramName) {
      throw new HttpException(
        'Program with the same name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingProgramCode = await this.programRepository.findOne({
      where: { id: Not(id), programCode: updateProgramInfo.programCode },
    });

    if (existingProgramCode) {
      throw new HttpException(
        'Program with the same code already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.programRepository.update({ id }, { ...updateProgramInfo });
  }

  async deleteProgram(id: number) {
    const program = await this.programRepository.findOneBy({ id });

    if (!program) {
      throw new HttpException('Program not found', HttpStatus.NOT_FOUND);
    }

    await this.programRepository.delete(id);
  }

  async getStudentPrograms(id: number) {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['programs'],
    });

    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    // return student.programs;

    return {
      studentId: student.id,
      programs: student.programs.map((program) => ({
        programId: program.id,
        programName: program.programName,
      })),
    };
  }
}
