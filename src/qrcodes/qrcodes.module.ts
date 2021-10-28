import { Module } from '@nestjs/common';
import { QrcodesController } from './qrcodes.controller';
import { QrcodesService } from './qrcodes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qrcode } from './qrcode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Qrcode])],
  controllers: [QrcodesController],
  providers: [QrcodesService],
})
export class QrcodesModule {}
