import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  courseCode: string;

  @IsNotEmpty()
  @IsString()
  courseName: string;
}
