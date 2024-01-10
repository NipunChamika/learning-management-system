import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
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
      },
      accessToken: this.jwtService.sign(payload),
    };
  }
}
