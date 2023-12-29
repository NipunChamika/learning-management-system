import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { CreateStudentInfoParams, CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Student } from 'src/typeorm/entities/student.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Student)
    private studentInfoRepository: Repository<Student>,
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
    userId: number,
    createStudentInfo: CreateStudentInfoParams,
  ) {
    const user = await this.userRepository.findOneBy({ userId });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const newStudentInfo = this.studentInfoRepository.create({
      ...createStudentInfo,
      user: user,
    });

    return this.studentInfoRepository.save(newStudentInfo);
  }
}
