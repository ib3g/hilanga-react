import { IsNotEmpty } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';

export class QrcodeDto {
  @IsNotEmpty() id: string;
  @IsNotEmpty() code: Date | null;
  @IsNotEmpty() qrcode: Date | null;
  @IsNotEmpty() qrcodeImgUrl: Date | null;
  owner?: any;
}
