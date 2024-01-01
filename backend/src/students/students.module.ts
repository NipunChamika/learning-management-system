import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { Student } from 'src/typeorm/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Student])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
