import { IsOptional, IsString } from 'class-validator';

export class UpdateProgramDto {
  @IsOptional()
  @IsString()
  programName: string;
}
