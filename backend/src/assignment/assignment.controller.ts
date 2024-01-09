import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
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

  @Get()
  async getAllAssignments(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    return this.assignmentService.getAllAssignments(page, limit);
  }

  @Get(':id')
  async getAssignmentById(@Param('id', ParseIntPipe) assignmentId: number) {
    try {
      return this.assignmentService.getAssignmentById(assignmentId);
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error fetching assignment',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
