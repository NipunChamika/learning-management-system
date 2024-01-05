import { Column, Entity, ManyToMany } from 'typeorm';
import { Student } from './student.entity';
import { BaseEntity } from 'src/core/entity/base.entity';

@Entity({ name: 'programs' })
export class Program extends BaseEntity {
  @Column()
  programName: string;

  @ManyToMany(() => Student, (student) => student.programs)
  students: Student[];
}
