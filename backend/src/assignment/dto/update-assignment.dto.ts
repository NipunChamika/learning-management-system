import { IsOptional, IsString } from 'class-validator';

export class UpdateAssignmentDto {
  @IsOptional()
  @IsString()
  assignmentTitle: string;

  @IsOptional()
  @IsString()
  resourcePath: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  dueDate: Date;
}
