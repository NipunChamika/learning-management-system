import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCourseDto {
    @IsString()
    @IsNotEmpty()
    courseName: string;
}