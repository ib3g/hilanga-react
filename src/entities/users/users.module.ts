import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from '../../auth/auth.service';
import { AuthModule } from '../../auth/auth.module';
import { QrcodesService } from '../qrcodes/qrcodes.service';
import { Qrcode } from '../qrcodes/qrcode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Qrcode]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService, QrcodesService],
})
export class UsersModule {}
