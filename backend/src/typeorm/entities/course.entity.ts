import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/core/entity/base.entity';
import { Entity, ManyToOne } from 'typeorm';
import { Program } from './program.entity';

@Entity({ name: 'courses' })
export class Course extends BaseEntity {
  @IsString()
  @IsNotEmpty()
  courseName: string;

  @ManyToOne(() => Program, (program) => program.courses)
  program: Program;
}
