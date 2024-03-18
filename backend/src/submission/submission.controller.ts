import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('submission')
export class SubmissionController {
  constructor(private submissionService: SubmissionService) {}

  @Post(':assignmentId/:indexNo')
  @UseInterceptors(FileInterceptor('file'))
  async createSubmission(
    @Param('assignmentId', ParseIntPipe) assignmentId: number,
    @Param('indexNo', ParseIntPipe) indexNo: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      await this.submissionService.createSubmission(
        assignmentId,
        indexNo,
        file,
      );
      return {
        status: 'File successfully uploaded',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: error.response || 'Error uploading file',
          code: error.status || HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
