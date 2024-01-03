import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity({ name: 'programs' })
export class Program {
  @PrimaryGeneratedColumn()
  programId: number;

  @Column()
  programName: string;

  @OneToMany(() => Student, (student) => student.program)
  students: Student[];
}
