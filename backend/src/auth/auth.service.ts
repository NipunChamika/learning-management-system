import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Student } from 'src/typeorm/entities/student.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async findUserWithEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findUserWithEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Incorrect Password', HttpStatus.UNAUTHORIZED);
    }

    const { password: userPassword, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async login(user: User) {
    let studentDetails = { studentId: undefined, indexNo: undefined };

    if (user.role === 'STUDENT') {
      const student = await this.studentRepository.findOne({
        where: { user: { id: user.id } },
      });

      if (student) {
        studentDetails = {
          studentId: student.id,
          indexNo: student.indexNo,
        };
      }
    }

    const payload = {
      sub: user.id,
      role: user.role,
    };

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        ...(studentDetails.studentId && {
          studentId: studentDetails.studentId,
          indexNo: studentDetails.indexNo,
        }),
      },
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: User) {
    const payload = {
      sub: user.id,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
