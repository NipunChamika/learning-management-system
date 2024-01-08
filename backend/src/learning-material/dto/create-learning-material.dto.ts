import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLearningMaterial {
  @IsString()
  @IsNotEmpty()
  materialType: string;

  @IsString()
  @IsOptional()
  resourcePath: string;
}
