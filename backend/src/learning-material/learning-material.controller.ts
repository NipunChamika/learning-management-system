import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LearningMaterialService } from './learning-material.service';
import { CreateLearningMaterial } from './dto/create-learning-material.dto';

@Controller('learning-material')
export class LearningMaterialController {
  constructor(private learningMaterialService: LearningMaterialService) {}

  @Post(':id')
  @UsePipes(new ValidationPipe())
  async createCourse(
    @Param('id', ParseIntPipe) courseId: number,
    @Body() createCourseDto: CreateLearningMaterial,
  ) {
    try {
      await this.learningMaterialService.createLearningMaterial(
        courseId,
        createCourseDto,
      );

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
}
