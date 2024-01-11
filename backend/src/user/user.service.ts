import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import {
  CreateUserParams,
  ResetPasswordParams,
  UpdateUserParams,
} from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Student } from 'src/typeorm/entities/student.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    private mailService: MailService,
  ) {}

  private async handleError(message: string, status: HttpStatus) {
    throw new HttpException(message, status);
  }

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
      this.handleError('User not found', HttpStatus.NOT_FOUND);
    }

    const { password, otpFlag, otp, otpRequestedAt, ...userWithoutPassword } =
      user;
    return userWithoutPassword;
  }

  async updateUser(id: number, updateUserDetails: UpdateUserParams) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      this.handleError('User not found', HttpStatus.BAD_REQUEST);
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
      this.handleError('User not found', HttpStatus.BAD_REQUEST);
    }

    if (user.student) {
      await this.studentRepository.softDelete(user.student.id);
    }

    await this.userRepository.softDelete(id);
  }

  async undoDeleteUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['student'],
      withDeleted: true,
    });

    if (!user) {
      this.handleError('User not found', HttpStatus.NOT_FOUND);
    }

    if (!user.deletedAt) {
      this.handleError('User is not deleted', HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.restore(id);

    if (user.student && user.student.deletedAt) {
      await this.studentRepository.restore(user.student.id);
    }
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'otp'],
    });

    if (!user) {
      this.handleError('User not found', HttpStatus.NOT_FOUND);
    }

    const otp = (Math.floor(Math.random() * 9000) + 1000).toString();

    user.otpRequestedAt = new Date();
    user.otp = otp;
    user.otpFlag = true;

    await this.userRepository.save(user);

    const mailResponse = await this.mailService.sendOtpEmail(email, otp);

    return mailResponse;
  }

  async resetPassword(resetPasswordDetails: ResetPasswordParams) {
    const user = await this.userRepository.findOne({
      where: {
        email: resetPasswordDetails.email,
        otp: resetPasswordDetails.otp,
        otpFlag: true,
      },
    });

    if (!user) {
      this.handleError(
        'Password reset request not found or invalid OTP',
        HttpStatus.NOT_FOUND,
      );
    }

    const expirationTime = +process.env.OTP_EXPIRATION;
    const currentTime = new Date();
    const otpRequestedTime = user.otpRequestedAt;

    const timeDiff = currentTime.getTime() - otpRequestedTime.getTime();

    if (timeDiff > expirationTime * 1000) {
      user.otp = null;
      user.otpFlag = false;

      await this.userRepository.save(user);

      this.handleError('OTP has expired', HttpStatus.GONE);
    }

    const hashedNewPassword = await bcrypt.hash(
      resetPasswordDetails.newPassword,
      10,
    );

    user.otp = null;
    user.otpFlag = false;
    user.password = hashedNewPassword;

    await this.userRepository.save(user);
  }
}
