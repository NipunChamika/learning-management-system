import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
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

  async getAllUsers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [users, totalCount] = await this.userRepository.findAndCount({
      skip: skip,
      take: limit,
      select: ['userId', 'firstName', 'lastName', 'email', 'role'],
    });

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: users,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
        skip,
      },
    };
  }

  async getUserById(userId: number) {
    const user = await this.userRepository.findOneBy({ userId });

    if (!user) {
      throw new Error('User not found');
    }

    const { password, otpFlag, otp, otpRequestedAt, ...userWithoutPassword } =
      user;
    return userWithoutPassword;
  }

  async updateUser(userId: number, updateUserDetails: UpdateUserParams) {
    const user = await this.userRepository.findOneBy({ userId });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.update({ userId }, { ...updateUserDetails });
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findOneBy({ userId });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.delete(userId);
  }
}
