import { IsNotEmpty } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';
import { User } from '../../users/user.entity';

export class QrcodeDto {
  @IsNotEmpty() id: string;
  @IsNotEmpty() code: string;
  @IsNotEmpty() qrcode: string;
  @IsNotEmpty() qrcodeImgUrl: string;
  owner?: User;
}
