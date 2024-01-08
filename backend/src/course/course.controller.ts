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
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';

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
}
