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
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.createUser(createUserDto);
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

  @Get()
  async getAllUsers(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    return this.userService.getAllUsers(page, limit);
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) userId: number) {
    try {
      return this.userService.getUserById(userId);
    } catch (error) {
      throw new HttpException(
        {
          status: 'User not found',
          code: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      await this.userService.updateUser(userId, updateUserDto);
      return {
        status: 'User updated successfully',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'User not found',
          code: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) userId: number) {
    try {
      await this.userService.deleteUser(userId);
      return {
        status: 'User deleted successfully',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'User not found',
          code: HttpStatus.NOT_FOUND,
          message: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post(':id/undo-delete')
  async undoDeleteUser(@Param('id', ParseIntPipe) userId: number) {
    try {
      await this.userService.undoDeleteUser(userId);
      return {
        status: 'User restored successfully',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error restoring the user',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
