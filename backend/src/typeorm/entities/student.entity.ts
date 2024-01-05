import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Program } from './program.entity';
import { BaseEntity } from 'src/core/base.entity';

@Entity({ name: 'students' })
export class Student extends BaseEntity {
  @Column()
  passedAL: boolean;

  @OneToOne(() => User, (user) => user.student, { cascade: ['soft-remove'] })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Program, (program) => program.students)
  @JoinTable({ name: 'student_programs' })
  programs: Program[];
}
