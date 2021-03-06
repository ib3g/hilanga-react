import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty() password: string;
  @IsNotEmpty() firstName: string;
  @IsNotEmpty() lastName: string;
  @IsNotEmpty() role: string[];
  @IsString() phone: string;
  @IsString() slug: string;
  @IsNotEmpty() @IsEmail() email: string;
  birthDay: Date | null;
  manager?: any;
}
