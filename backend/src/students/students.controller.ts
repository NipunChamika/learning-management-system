import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentInfoDto } from './dto/create-student-info.dto';
import { UpdateStudentInfoDto } from './dto/update-student-info.dto';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Post(':id')
  @UsePipes(new ValidationPipe())
  async createStudentDetails(
    @Param('id', ParseIntPipe) userId: number,
    @Body() createStudentInfoDto: CreateStudentInfoDto,
  ) {
    try {
      await this.studentsService.createStudentInfo(
        userId,
        createStudentInfoDto,
      );
      return {
        status: 'Student profile created successfully',
        code: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error creating student profile',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateStudentDetails(
    @Param('id', ParseIntPipe) studentId: number,
    @Body() updateStudentInfoDto: UpdateStudentInfoDto,
  ) {
    try {
      await this.studentsService.updateStudentInfo(
        studentId,
        updateStudentInfoDto,
      );
      return {
        status: 'Student profile updated successfully',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error updating student profile',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}