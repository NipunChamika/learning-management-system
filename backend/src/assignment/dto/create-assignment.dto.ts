import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @IsNotEmpty()
  @IsString()
  assignmentTitle: string;

  @IsOptional()
  @IsString()
  resourcePath: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  dueDate: Date;
}
