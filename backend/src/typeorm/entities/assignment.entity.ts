import { BaseEntity } from 'src/core/entity/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Course } from './course.entity';

@Entity({ name: 'assignments' })
export class Assignment extends BaseEntity {
  @Column({ nullable: true })
  resourcePath: string;

  @ManyToOne(() => Course, (course) => course.assignments)
  course: Course;
}
