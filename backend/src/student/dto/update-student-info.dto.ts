import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateStudentInfoDto {
  // @IsOptional()
  // @IsString()
  // programEnrolled?: string;

  @IsOptional()
  @IsBoolean()
  passedAL?: boolean;
}
