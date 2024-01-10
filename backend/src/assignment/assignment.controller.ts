import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('assignment')
export class AssignmentController {
  constructor(private assignmentService: AssignmentService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  async getAllAssignments(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    return this.assignmentService.getAllAssignments(page, limit);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STUDENT')
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateAssignment(
    @Param('id', ParseIntPipe) assignmentId: number,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    try {
      await this.assignmentService.updateAssignment(
        assignmentId,
        updateAssignmentDto,
      );

      return {
        status: 'Assignment updated successfully',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error updating assignment',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async deleteAssignment(@Param('id', ParseIntPipe) assignmentId: number) {
    try {
      await this.assignmentService.deleteAssignment(assignmentId);

      return {
        status: 'Assignment deleted successfully',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error deleting assignment',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post(':id/undo-delete')
  async undoDeleteAssignment(@Param('id', ParseIntPipe) assignmentId: number) {
    try {
      await this.assignmentService.undoDeleteAssignment(assignmentId);
      return {
        status: 'Assignment restored successfully',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error restoring the assignment',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
