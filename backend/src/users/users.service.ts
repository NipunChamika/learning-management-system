import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { CreateStudentInfoParams, CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userDetails: CreateUserParams) {
    const { password } = userDetails;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      ...userDetails,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async createStudentInfo(
    id: number,
    studentDetails: CreateStudentInfoParams,
  ) {}
}
