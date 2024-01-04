import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Program } from './program.entity';
import { BaseEntity } from 'src/core/base.entity';

@Entity({ name: 'students' })
export class Student extends BaseEntity {
  @Column()
  passedAL: boolean;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Program, (program) => program.students)
  @JoinColumn({ name: 'programId' })
  program: Program;
}
