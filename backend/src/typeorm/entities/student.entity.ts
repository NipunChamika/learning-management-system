import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Program } from './program.entity';

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn()
  studentId: number;

  @Column()
  passedAL: boolean;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Program, (program) => program.students)
  @JoinColumn({ name: 'programId' })
  program: Program;
}
