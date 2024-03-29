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
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
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
          status: error.response || 'Error creating user',
          code: error.status || HttpStatus.BAD_REQUEST,
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch('update-password')
  @UsePipes(new ValidationPipe())
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    try {
      await this.userService.updatePassword(updatePasswordDto.email);
      return {
        status:
          'An email with the temporary password will be sent to your email',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: error.response || 'Error updating password',
          code: error.status || HttpStatus.BAD_REQUEST,
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  async getAllUsers(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    try {
      return this.userService.getAllUsers(page, limit);
    } catch (error) {
      throw new HttpException(
        {
          status: error.response || 'Error fetching all users',
          code: error.status || HttpStatus.BAD_REQUEST,
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) userId: number) {
    try {
      return this.userService.getUserById(userId);
    } catch (error) {
      throw new HttpException(
        {
          status: error.response || 'Error fetching user',
          code: error.status || HttpStatus.BAD_REQUEST,
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  @UsePipes(new ValidationPipe())
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
          status: error.response || 'Error updating user',
          code: error.status || HttpStatus.BAD_REQUEST,
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
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
          status: error.response || 'Error deleting user',
          code: error.status || HttpStatus.BAD_REQUEST,
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
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
          status: error.response || 'Error restoring the user',
          code: error.status || HttpStatus.BAD_REQUEST,
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('forgot-password')
  @UsePipes(new ValidationPipe())
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    try {
      const { email } = forgotPasswordDto;
      return await this.userService.forgotPassword(email);
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error finding user',
          code: HttpStatus.NOT_FOUND,
          message: error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('reset-password')
  @UsePipes(new ValidationPipe())
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      await this.userService.resetPassword(resetPasswordDto);
      return {
        status: 'Password reset successfully',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: error.response || 'Error resetting password',
          code: error.status || HttpStatus.BAD_REQUEST,
        },
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
