import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
