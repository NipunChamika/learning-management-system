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
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post(':id')
  @UsePipes(new ValidationPipe())
  async createCourse(
    @Param('id', ParseIntPipe) programId: number,
    @Body() createCourseDto: CreateCourseDto,
  ) {
    try {
      await this.courseService.createCourse(programId, createCourseDto);

      return {
        status: 'Course created successfully',
        code: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error creating course',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async getAllCourses(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    return this.courseService.getAllCourses(page, limit);
  }

  @Get(':id')
  async getCourseById(@Param('id', ParseIntPipe) courseId: number) {
    try {
      return this.courseService.getCourseById(courseId);
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error fetching course',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateCourse(
    @Param('id', ParseIntPipe) courseId: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    try {
      await this.courseService.updateCourse(courseId, updateCourseDto);

      return {
        status: 'Course updated successfully',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error updating course',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async deleteCourse(@Param('id', ParseIntPipe) courseId: number) {
    try {
      await this.courseService.deleteCourse(courseId);

      return {
        status: 'Course deleted successfully',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error deleting course',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
