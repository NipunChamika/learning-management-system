import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { mkdirSync } from 'fs';

@Controller('submission')
export class SubmissionController {
  constructor(private submissionService: SubmissionService) {}

  @Post(':assignmentId/:indexNo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (
          req: Request,
          file: Express.Multer.File,
          callback: (error: Error | null, destination: string) => void,
        ) => {
          const assignmentId = req.params.assignmentId;
          const indexNo = req.params.indexNo;
          const uploadPath = `C:/Users/Nipun/Documents/uploads/submissions/${assignmentId}/${indexNo}`;

          try {
            // Ensure the directory exists otherwise create it
            mkdirSync(uploadPath, { recursive: true });

            (req as any).uploadPath = uploadPath;

            callback(null, uploadPath);
          } catch (error) {
            callback(error, uploadPath);
          }
        },
      }),
    }),
  )
  async createSubmission(
    @Param('assignmentId', ParseIntPipe) assignmentId: number,
    @Param('indexNo', ParseIntPipe) indexNo: number,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    try {
      const uploadPath = (req as any).uploadPath;

      await this.submissionService.createSubmission(
        assignmentId,
        indexNo,
        file,
        uploadPath,
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
