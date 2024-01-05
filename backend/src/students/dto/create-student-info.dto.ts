import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStudentInfoDto {
  @IsBoolean()
  @IsNotEmpty()
  passedAL: boolean;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  programIds: number[];
}
