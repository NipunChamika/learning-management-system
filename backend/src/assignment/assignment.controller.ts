import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Controller('assignment')
export class AssignmentController {
  constructor(private assignmentService: AssignmentService) {}

  @Post(':id')
  @UsePipes(new ValidationPipe())
  async createAssignment(
    @Param('id', ParseIntPipe) courseId: number,
    @Body() createAssignmentDto: CreateAssignmentDto,
  ) {
    try {
      await this.assignmentService.createAssignment(
        courseId,
        createAssignmentDto,
      );

      return {
        status: 'Assignment created successfully',
        code: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error creating assignment',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
