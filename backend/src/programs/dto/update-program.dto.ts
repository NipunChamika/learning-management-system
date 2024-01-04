import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProgramDto {
  @IsString()
  @IsNotEmpty()
  programName: string;
}
