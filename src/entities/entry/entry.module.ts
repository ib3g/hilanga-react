import { Module } from '@nestjs/common';
import { EntryController } from './entry.controller';
import { EntryService } from './entry.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Place } from '../place/place.entity';
import { Qrcode } from '../qrcodes/qrcode.entity';
import { AuthModule } from '../../auth/auth.module';
import { AuthService } from '../../auth/auth.service';
import { QrcodesService } from '../qrcodes/qrcodes.service';
import { Entry } from './entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entry, User, Place, Qrcode]), AuthModule],
  controllers: [EntryController],
  providers: [EntryService, AuthService, QrcodesService],
})
export class EntryModule {}
