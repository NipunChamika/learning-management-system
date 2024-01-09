import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProgramDto {
  @IsNotEmpty()
  @IsString()
  programName: string;
}
