import { BaseEntity } from 'src/core/entity/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Course } from './course.entity';
import { Submission } from './submission.entity';

@Entity({ name: 'assignments' })
export class Assignment extends BaseEntity {
  @Column()
  assignmentTitle: string;

  @Column({ nullable: true })
  resourcePath: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column()
  dueDate: Date;

  @ManyToOne(() => Course, (course) => course.assignments)
  course: Course;

  @OneToMany(() => Submission, (submission) => submission.assignment)
  submissions: Submission[];
}
