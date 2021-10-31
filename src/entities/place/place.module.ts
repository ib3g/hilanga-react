import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Place } from './place.entity';
import { AuthModule } from '../../auth/auth.module';
import { Qrcode } from '../qrcodes/qrcode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Place, Qrcode]), AuthModule],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
