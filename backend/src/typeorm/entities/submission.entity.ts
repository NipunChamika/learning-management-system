import { BaseEntity } from 'src/core/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Student } from './student.entity';
import { Assignment } from './assignment.entity';

@Entity({ name: 'submissions' })
export class Submission extends BaseEntity {
  @Column()
  submissionDate: Date;

  @Column()
  submissionCount: number;

  @Column()
  resourcePath: string;

  @ManyToOne(() => Student, (student) => student.submissions)
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @ManyToOne(() => Assignment, (assignment) => assignment.submissions, {
    cascade: ['soft-remove'],
  })
  @JoinColumn({ name: 'assignmentId' })
  assignment: Assignment;
}
