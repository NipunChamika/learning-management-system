import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentInfoDto {
  @IsString()
  @IsNotEmpty()
  programEnrolled: string;

  @IsBoolean()
  @IsNotEmpty()
  passedAL: boolean;
}
