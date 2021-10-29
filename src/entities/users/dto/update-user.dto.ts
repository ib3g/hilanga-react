import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty() firstName: string;
  @IsNotEmpty() lastName: string;
  @IsString() phone: string;
  @IsString() slug: string;
  @IsNotEmpty() @IsEmail() email: string;
  birthDay: Date | null;
}
