import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStudentInfoDto {
  // @IsString()
  // @IsNotEmpty()
  // programEnrolled: string;

  @IsBoolean()
  @IsNotEmpty()
  passedAL: boolean;

  @IsNumber()
  @IsNotEmpty()
  programId: number;
}
