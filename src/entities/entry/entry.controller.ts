import { Controller, Param, Post, Req } from '@nestjs/common';
import { EntryService } from './entry.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entry.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Qrcode } from '../qrcodes/qrcode.entity';
import { Place } from '../place/place.entity';

@Controller('entry')
export class EntryController {
  constructor(
    private readonly entryService: EntryService,
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
    @InjectRepository(Qrcode)
    private readonly qrcodeRepository: Repository<Qrcode>,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {}

  @Post('scan/:placeSlug/:qrCode/:time')
  async scan(
    @Req() req: Request,
    @Param('placeSlug') placeSlug: string,
    @Param('qrCode') qrcode: string,
    @Param('time') time: string,
  ) {
    return this.placeRepository
      .findOne({ slug: placeSlug }, { relations: ['manager'] })
      .then((place) => {
        return this.qrcodeRepository
          .findOne({ qrcode: qrcode })
          .then(async (qrCode) => {
            return await this.entryService.createOrUpdate(qrCode, place, time);
          });
      });
  }
}
