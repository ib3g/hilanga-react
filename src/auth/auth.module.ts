import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import * as dotenv from 'dotenv';
import { Qrcode } from '../entities/qrcodes/qrcode.entity';
import { QrcodesService } from '../entities/qrcodes/qrcodes.service';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Qrcode]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRES_IN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, QrcodesService],
  exports: [PassportModule, JwtModule, AuthModule],
})
export class AuthModule {}
