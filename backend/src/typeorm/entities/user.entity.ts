import { BaseEntity } from 'src/core/entity/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { Student } from './student.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ default: false })
  otpFlag: boolean;

  @Column({ nullable: true, length: 4 })
  otp: string;

  @Column({ nullable: true })
  otpRequestedAt: Date;

  @OneToOne(() => Student, (student) => student.user)
  student: Student;
}
