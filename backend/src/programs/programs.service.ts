import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from 'src/typeorm/entities/program.entity';
import { CreateProgramParams } from 'src/utils/types';
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
}
