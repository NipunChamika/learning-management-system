import { IsOptional, IsString } from 'class-validator';

export class UpdateProgramDto {
  @IsOptional()
  @IsString()
  programCode: string;

  @IsOptional()
  @IsString()
  programName: string;
}
