import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'students' })
export class students {
  @PrimaryGeneratedColumn()
  studentId: number;

  @Column()
  programEnrolled: string;

  @Column()
  passedAL: boolean;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
