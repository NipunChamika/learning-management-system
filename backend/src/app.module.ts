import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './typeorm/datasource/data-source';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { ProgramsModule } from './programs/programs.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, StudentsModule, ProgramsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
