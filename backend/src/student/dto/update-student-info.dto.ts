import { IsArray, IsBoolean, IsInt, IsOptional } from 'class-validator';

export class UpdateStudentInfoDto {
  @IsOptional()
  @IsBoolean()
  passedAL?: boolean;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  programIds?: number[];
}
