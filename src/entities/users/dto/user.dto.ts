import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Qrcode } from '../../qrcodes/qrcode.entity';

export class UserDto {
  @IsNotEmpty() id: number;
  @IsNotEmpty() firstName: string;
  @IsNotEmpty() lastName: string;
  @IsNotEmpty() role: string[];
  @IsString() phone: string;
  @IsString() slug: string;
  @IsNotEmpty() @IsEmail() email: string;
  birthDay: Date | null;
  manager?: UserDto;
  qrCode?: Qrcode;
}
