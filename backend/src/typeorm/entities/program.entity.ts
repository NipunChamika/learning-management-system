import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'programs' })
export class Program {
  @PrimaryGeneratedColumn()
  programId: number;

  @Column()
  programName: string;
}
