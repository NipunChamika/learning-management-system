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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentInfoDto } from './dto/create-student-info.dto';
import { UpdateStudentInfoDto } from './dto/update-student-info.dto';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post(':id')
  @UsePipes(new ValidationPipe())
  async createStudentDetails(
    @Param('id', ParseIntPipe) userId: number,
    @Body() createStudentInfoDto: CreateStudentInfoDto,
  ) {
    try {
      await this.studentService.createStudentInfo(userId, createStudentInfoDto);
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

  @Get()
  async getAllStudents(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    return this.studentService.getAllStudents(page, limit);
  }

  @Get(':id')
  async getStudentById(@Param('id', ParseIntPipe) studentId: number) {
    try {
      return this.studentService.getStudentById(studentId);
    } catch (error) {
      throw new HttpException(
        {
          status: 'Student not found',
          code: HttpStatus.NOT_FOUND,
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
      await this.studentService.updateStudentInfo(
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

  @Delete(':id')
  async deleteStudent(@Param('id', ParseIntPipe) studentId: number) {
    try {
      await this.studentService.deleteStudent(studentId);
      return {
        status: 'User deleted successfully',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'User not found',
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
