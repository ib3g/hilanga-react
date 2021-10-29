import { IsNotEmpty } from 'class-validator';

export class CreateQrcodeDto {
  @IsNotEmpty() code: Date | null;
  @IsNotEmpty() qrcode: Date | null;
  @IsNotEmpty() qrcodeImgUrl: Date | null;
  owner?: any;
}
