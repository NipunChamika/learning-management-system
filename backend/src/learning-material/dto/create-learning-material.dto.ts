import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLearningMaterial {
  @IsNotEmpty()
  @IsString()
  materialType: string;

  @IsOptional()
  @IsString()
  resourcePath: string;
}
