import { IsOptional, IsString } from 'class-validator';

export class UpdateAssignmentDto {
  @IsOptional()
  @IsString()
  assignmentTitle: string;

  @IsOptional()
  @IsString()
  resourcePath: string;
}
