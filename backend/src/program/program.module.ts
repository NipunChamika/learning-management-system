import { Module } from '@nestjs/common';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from 'src/typeorm/entities/program.entity';
import { Student } from 'src/typeorm/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Program, Student])],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgramModule {}
