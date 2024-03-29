import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      let errorMessage = 'Unauthorized';

      // Handle access token errors
      if (info instanceof TokenExpiredError) {
        errorMessage = 'Access token has expired';
      } else if (info instanceof JsonWebTokenError) {
        errorMessage = 'Invalid access token';
      } else if (info && info.message === 'No auth token') {
        errorMessage = 'No access token provided';
      }

      throw new UnauthorizedException(errorMessage);
    }

    // Return the user object on successful authentication
    return user;
  }
}
