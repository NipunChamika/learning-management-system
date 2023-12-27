import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

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
}
