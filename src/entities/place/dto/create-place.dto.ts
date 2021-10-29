import { IsNotEmpty } from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty() slug: string;
  @IsNotEmpty() name: string;
  @IsNotEmpty() start: Date | null;
  @IsNotEmpty() breakStart: Date | null;
  @IsNotEmpty() breakEnd: Date | null;
  @IsNotEmpty() end: Date | null;
  manager?: any;
}
