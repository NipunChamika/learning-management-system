import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CreateStudentInfoDto } from './dto/create-student-info.dto';

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

  @Post(':id/students')
  async createStudentDetails(
    @Param('id') id: number,
    @Body() createStudentInfoDto: CreateStudentInfoDto,
  ) {
    return this.usersService.createStudentInfo(id, createStudentInfoDto);
  }
}
