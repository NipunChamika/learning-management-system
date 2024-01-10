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
import { ProgramService } from './program.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('program')
export class ProgramController {
  constructor(private programService: ProgramService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  async createProgram(@Body() createProgramDto: CreateProgramDto) {
    try {
      await this.programService.createProgram(createProgramDto);
      return {
        status: 'Program created successfully',
        code: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error creating program',
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllPrograms(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    return this.programService.getAllPrograms(page, limit);
  }

  @Get(':id')
  async getProgramById(@Param('id', ParseIntPipe) programId: number) {
    try {
      return this.programService.getProgramById(programId);
    } catch (error) {
      throw new HttpException(
        {
          status: 'Program not found',
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateProgram(
    @Param('id', ParseIntPipe) programId: number,
    @Body() updateProgramInfo: UpdateProgramDto,
  ) {
    try {
      await this.programService.updateProgram(programId, updateProgramInfo);
      return {
        status: 'Program updated successfully',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error updating program',
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProgram(@Param('id', ParseIntPipe) programId: number) {
    try {
      await this.programService.deleteProgram(programId);
      return {
        status: 'Program deleted successfully',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error deleting program',
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
