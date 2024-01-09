import { BaseEntity } from 'src/core/entity/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';

@Entity({ name: 'learning_materials' })
export class LearningMaterial extends BaseEntity {
  @Column()
  learningMaterialTitle: string;

  @Column()
  materialType: string;

  @Column({ nullable: true })
  resourcePath: string;

  @ManyToOne(() => Course, (course) => course.learningMaterials)
  course: Course;
}
