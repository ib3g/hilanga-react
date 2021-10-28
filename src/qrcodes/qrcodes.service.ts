import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Qrcode } from './qrcode.entity';

@Injectable()
export class QrcodesService {
  constructor(
    @InjectRepository(Qrcode)
    private readonly qrcodeRepository: Repository<Qrcode>,
  ) {}

  async create(qrCode: any): Promise<Qrcode> {
    return this.qrcodeRepository.save(qrCode);
  }

  async update(data: any): Promise<Qrcode> {
    const qrCode = await this.qrcodeRepository.findOne(data.id);

    if (!qrCode) {
      throw new BadRequestException('invalide qrCode');
    }

    await this.qrcodeRepository.update({ id: qrCode.id }, data);

    return qrCode;
  }

  async delete(qrCode: any): Promise<any> {}
}
