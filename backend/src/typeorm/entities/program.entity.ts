import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Student } from './student.entity';
import { BaseEntity } from 'src/core/entity/base.entity';
import { Course } from './course.entity';

@Entity({ name: 'programs' })
export class Program extends BaseEntity {
  @Column()
  programName: string;

  @ManyToMany(() => Student, (student) => student.programs)
  students: Student[];

  @OneToMany(() => Course, (course) => course.program)
  courses: Course[];
}
