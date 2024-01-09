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
import { LearningMaterialService } from './learning-material.service';
import { CreateLearningMaterial } from './dto/create-learning-material.dto';
import { UpdateLearningMaterialDto } from './dto/update-learning-material.dto';

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

  @Get()
  async getAllCourses(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    return this.learningMaterialService.getAllLearningMaterial(page, limit);
  }

  @Get(':id')
  async getLearningMaterialById(
    @Param('id', ParseIntPipe) learningMaterialId: number,
  ) {
    try {
      return this.learningMaterialService.getLearningMaterialById(
        learningMaterialId,
      );
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error fetching learning material',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateLearningMaterial(
    @Param('id', ParseIntPipe) learningMaterialId: number,
    @Body() updateLearningMaterialDto: UpdateLearningMaterialDto,
  ) {
    try {
      await this.learningMaterialService.updateLearningMaterial(
        learningMaterialId,
        updateLearningMaterialDto,
      );

      return {
        status: 'Learning material updated successfully',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error updating learning material',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async deleteLearningMaterial(
    @Param('id', ParseIntPipe) learningMaterialId: number,
  ) {
    try {
      await this.learningMaterialService.deleteLearningMaterial(
        learningMaterialId,
      );

      return {
        status: 'Learning material deleted successfully',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error deleting learning material',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
