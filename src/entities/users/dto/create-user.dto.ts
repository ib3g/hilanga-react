import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() firstName: string;
  @IsNotEmpty() lastName: string;
  @IsNotEmpty() role: string[];
  @IsString() phone: string;
  @IsString() slug: string;
}
