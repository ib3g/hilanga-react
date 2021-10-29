import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Place } from './place.entity';
import { AuthService } from '../../auth/auth.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Place]), AuthModule],
  controllers: [PlaceController],
  providers: [PlaceService, AuthService],
})
export class PlaceModule {}
