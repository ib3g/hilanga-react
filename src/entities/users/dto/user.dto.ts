import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty() id: number;
  @IsNotEmpty() firstName: string;
  @IsNotEmpty() lastName: string;
  @IsNotEmpty() role: string[];
  @IsString() phone: string;
  @IsString() slug: string;
  @IsNotEmpty() @IsEmail() email: string;
  manager?: UserDto;
}
