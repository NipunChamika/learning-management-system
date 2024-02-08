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
import { LearningMaterialService } from './learning-material.service';
import { CreateLearningMaterialDto } from './dto/create-learning-material.dto';
import { UpdateLearningMaterialDto } from './dto/update-learning-material.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('learning-material')
export class LearningMaterialController {
  constructor(private learningMaterialService: LearningMaterialService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post(':id')
  @UsePipes(new ValidationPipe())
  async createLearningMaterial(
    @Param('id', ParseIntPipe) courseId: number,
    @Body() createLearningMaterialDto: CreateLearningMaterialDto,
  ) {
    try {
      await this.learningMaterialService.createLearningMaterial(
        courseId,
        createLearningMaterialDto,
      );

      return {
        status: 'Learning material created successfully',
        code: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error creating learning material',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  async getAllLearningMaterials(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    return this.learningMaterialService.getAllLearningMaterial(page, limit);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STUDENT')
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post(':id/undo-delete')
  async undoDeleteLearningMaterial(
    @Param('id', ParseIntPipe) learningMaterialId: number,
  ) {
    try {
      await this.learningMaterialService.undoDeleteLearningMaterial(
        learningMaterialId,
      );
      return {
        status: 'Learning material restored successfully',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error restoring the learning material',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STUDENT')
  @Get('course/:id')
  async getCourseLearningMaterials(
    @Param('id', ParseIntPipe) courseId: number,
  ) {
    try {
      await this.learningMaterialService.getCourseLearningMaterials(courseId);
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error fetching course learning materials',
          code: HttpStatus.BAD_REQUEST,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
