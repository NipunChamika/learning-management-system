import { Column, Entity, OneToMany } from 'typeorm';
import { Student } from './student.entity';
import { BaseEntity } from 'src/core/base.entity';

@Entity({ name: 'programs' })
export class Program extends BaseEntity {
  @Column()
  programName: string;

  @OneToMany(() => Student, (student) => student.program)
  students: Student[];
}
