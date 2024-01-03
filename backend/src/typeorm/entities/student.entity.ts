import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn()
  studentId: number;

  @Column()
  passedAL: boolean;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
