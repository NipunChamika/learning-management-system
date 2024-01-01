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
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CreateStudentInfoDto } from './dto/create-student-info.dto';
import { UpdateStudentInfoDto } from './dto/update-student-info.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      await this.usersService.createUser(createUserDto);
      return {
        status: 'User created successfully',
        code: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error creating user',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':id/student')
  @UsePipes(new ValidationPipe())
  async createStudentDetails(
    @Param('id', ParseIntPipe) userId: number,
    @Body() createStudentInfoDto: CreateStudentInfoDto,
  ) {
    try {
      await this.usersService.createStudentInfo(userId, createStudentInfoDto);
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

  @Patch('student/:id')
  @UsePipes(new ValidationPipe())
  async updateStudentDetails(
    @Param('id', ParseIntPipe) studentId: number,
    @Body() updateStudentInfoDto: UpdateStudentInfoDto,
  ) {
    try {
      await this.usersService.updateStudentInfo(
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
