import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard('jwt-refresh') {
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      let errorMessage = 'Unauthorized';

      // Handle refresh token errors
      if (info instanceof TokenExpiredError) {
        errorMessage = 'Refresh token has expired';
      } else if (info instanceof JsonWebTokenError) {
        errorMessage = 'Invalid refresh token';
      } else if (info && info.message === 'No auth token') {
        errorMessage = 'No refresh token provided';
      }

      throw new UnauthorizedException(errorMessage);
    }

    return user;
  }
}
