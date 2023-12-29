import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { Student } from 'src/typeorm/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Student])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
