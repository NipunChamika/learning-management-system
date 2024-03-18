import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Program } from './program.entity';
import { BaseEntity } from 'src/core/entity/base.entity';
import { Submission } from './submission.entity';

@Entity({ name: 'students' })
export class Student extends BaseEntity {
  @Column({ unique: true })
  indexNo: number;

  @Column()
  passedAL: boolean;

  @OneToOne(() => User, (user) => user.student, { cascade: ['soft-remove'] })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Program, (program) => program.students)
  @JoinTable({ name: 'student_programs' })
  programs: Program[];

  @OneToMany(() => Submission, (submission) => submission.student)
  submissions: Submission[];
}
