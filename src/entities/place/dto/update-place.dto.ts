import { IsNotEmpty } from 'class-validator';

export class UpdatePlaceDto {
  @IsNotEmpty() slug: string;
  @IsNotEmpty() name: string;
  @IsNotEmpty() start: Date | null;
  @IsNotEmpty() breakStart: Date | null;
  @IsNotEmpty() breakEnd: Date | null;
  @IsNotEmpty() end: Date | null;
}
