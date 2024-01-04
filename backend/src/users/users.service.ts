import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Student } from 'src/typeorm/entities/student.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
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
      select: ['id', 'firstName', 'lastName', 'email', 'role'],
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

  async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }

    const { password, otpFlag, otp, otpRequestedAt, ...userWithoutPassword } =
      user;
    return userWithoutPassword;
  }

  async updateUser(id: number, updateUserDetails: UpdateUserParams) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.update({ id }, { ...updateUserDetails });
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['student'],
    });
    // const userExists = await this.userRepository.count({ id }) > 0; More efficient than loading the entire user

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    if (user.student) {
      await this.studentRepository.softDelete(user.student.id);
    }

    await this.userRepository.softDelete(id);
  }

  async undoDeleteUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!user.deletedAt) {
      throw new HttpException('User is not deleted', HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.restore(id);

    if (user.student && user.student.deletedAt) {
      await this.studentRepository.restore(user.student.id);
    }
  }
}
