import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProgramDto {
  @IsNotEmpty()
  @IsString()
  programCode: string;

  @IsNotEmpty()
  @IsString()
  programName: string;
}
