import { IsOptional, IsString } from 'class-validator';

export class UpdateLearningMaterialDto {
  @IsOptional()
  @IsString()
  materialType: string;

  @IsOptional()
  @IsString()
  resourcePath: string;
}
