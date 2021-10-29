import { IsNotEmpty } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';

export class PlaceDto {
  @IsNotEmpty() id: number;
  @IsNotEmpty() slug: string;
  @IsNotEmpty() name: string;
  @IsNotEmpty() start: Date | null;
  @IsNotEmpty() breakStart: Date | null;
  @IsNotEmpty() breakEnd: Date | null;
  @IsNotEmpty() end: Date | null;
  manager?: UserDto;
  entries?: [];
}
