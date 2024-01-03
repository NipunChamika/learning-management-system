import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { Student } from 'src/typeorm/entities/student.entity';
import { Program } from 'src/typeorm/entities/program.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Student, Program])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
