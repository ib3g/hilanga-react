import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Qrcode } from './qrcode.entity';
import * as Str from '@supercharge/strings';
import * as QRCodeGenerator from 'qrcode';
import { User } from '../users/user.entity';

@Injectable()
export class QrcodesService {
  constructor(
    @InjectRepository(Qrcode)
    private readonly qrcodeRepository: Repository<Qrcode>,
  ) {}

  async create(user: User): Promise<Qrcode> {
    try {
      let qrcode = new Qrcode();
      const random = Str.random();
      const code = random + '_' + new Date().getTime();
      const url = await QRCodeGenerator.toDataURL(code);

      // generate a unique code
      let str = user.firstName + ' ' + user.lastName;
      let matches = str.match(/\b(\w)/g); // ['J','S','O','N']
      let acronym = matches.join(''); // JSON
      qrcode.code = (acronym + '0' + user.id).toUpperCase();

      qrcode.qrcode = code;
      qrcode.qrcodeImgUrl = url;
      qrcode.owner = user;

      await this.qrcodeRepository.save(qrcode);

      return qrcode;
    } catch (e) {
      return e.message;
    }
  }

  async update(user: User): Promise<Qrcode> {
    // delete user old Qrcode before gnerating a new one
    // then use the create methods to generate a new qrcode for the user

    const qrCode = this.create(user);

    return qrCode;
  }
}
