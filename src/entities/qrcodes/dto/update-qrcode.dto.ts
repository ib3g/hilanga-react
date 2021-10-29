import { IsNotEmpty } from 'class-validator';

export class UpdateQrcodeDto {
  @IsNotEmpty() code: Date | null;
  @IsNotEmpty() qrcode: Date | null;
  @IsNotEmpty() qrcodeImgUrl: Date | null;
}
