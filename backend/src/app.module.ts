import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './typeorm/datasource/data-source';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { ProgramModule } from './program/program.module';
import { CourseModule } from './course/course.module';
import { LearningMaterialModule } from './learning-material/learning-material.module';
import { AssignmentModule } from './assignment/assignment.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { SubmissionModule } from './submission/submission.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    StudentModule,
    ProgramModule,
    CourseModule,
    LearningMaterialModule,
    AssignmentModule,
    AuthModule,
    MailModule,
    SubmissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
