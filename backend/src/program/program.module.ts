import { Module } from '@nestjs/common';
import { ProgramsController } from './program.controller';
import { ProgramsService } from './program.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from 'src/typeorm/entities/program.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Program])],
  controllers: [ProgramsController],
  providers: [ProgramsService],
})
export class ProgramsModule {}
