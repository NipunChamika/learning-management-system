import { IsOptional, IsString } from 'class-validator';

export class UpdateLearningMaterialDto {
  @IsOptional()
  @IsString()
  learningMaterialTitle: string;

  @IsOptional()
  @IsString()
  materialType: string;

  @IsOptional()
  @IsString()
  resourcePath: string;
}
