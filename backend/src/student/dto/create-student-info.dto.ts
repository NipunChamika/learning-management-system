import { IsArray, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStudentInfoDto {
  @IsNotEmpty()
  @IsBoolean()
  passedAL: boolean;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  programIds: number[];
}
