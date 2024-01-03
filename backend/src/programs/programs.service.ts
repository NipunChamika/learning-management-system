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
}
