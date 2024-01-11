import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtpEmail(email: string, otp: string) {
    try {
      await this.mailerService.sendMail({
        from: {
          name: 'Softcodeit',
          address: 'noreply@softcodeit.com',
        },
        to: email,
        subject: 'Your OTP Code',
        context: {
          otp: otp,
        },
        template: 'otp-email',
      });

      return {
        status: 'An OTP will be sent to your email',
        code: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error sending the email',
          code: HttpStatus.BAD_REQUEST,
          message: error.message || 'Http Exception',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
