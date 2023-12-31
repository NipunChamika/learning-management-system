import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLearningMaterialDto {
  @IsNotEmpty()
  @IsString()
  learningMaterialTitle: string;

  @IsNotEmpty()
  @IsString()
  materialType: string;

  @IsOptional()
  @IsString()
  resourcePath: string;
}
