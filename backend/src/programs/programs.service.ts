import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from 'src/typeorm/entities/program.entity';
import { CreateProgramParams, UpdateProrgamParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private programRepository: Repository<Program>,
  ) {}

  async createProgram(programDetails: CreateProgramParams) {
    const newProgram = this.programRepository.create(programDetails);

    return this.programRepository.save(newProgram);
  }

  async getAllPrograms(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [programs, totalCount] = await this.programRepository.findAndCount({
      skip: skip,
      take: limit,
      select: ['programId', 'programName'],
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

  async getProgramById(programId: number) {
    const program = await this.programRepository.findOneBy({ programId });

    if (!program) {
      throw new HttpException('Program not found', HttpStatus.NOT_FOUND);
    }

    return program;
  }

  async updateProgram(
    programId: number,
    updateProgramInfo: UpdateProrgamParams,
  ) {
    const program = await this.programRepository.findOneBy({ programId });

    if (!program) {
      throw new HttpException('Program not found', HttpStatus.NOT_FOUND);
    }

    await this.programRepository.update(
      { programId },
      { ...updateProgramInfo },
    );
  }

  async deleteProgram(programId: number) {
    const program = await this.programRepository.findOneBy({ programId });

    if (!program) {
      throw new HttpException('Program not found', HttpStatus.NOT_FOUND);
    }

    await this.programRepository.delete(programId);
  }
}
