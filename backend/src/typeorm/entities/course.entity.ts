import { BaseEntity } from 'src/core/entity/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Program } from './program.entity';
import { LearningMaterial } from './learning-material.entity';

@Entity({ name: 'courses' })
export class Course extends BaseEntity {
  @Column()
  courseName: string;

  @ManyToOne(() => Program, (program) => program.courses)
  program: Program;

  @OneToMany(
    () => LearningMaterial,
    (learningMaterial) => learningMaterial.course,
  )
  learningMaterials: LearningMaterial[];
}
