import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { EntryService } from './entry.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entry.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Qrcode } from '../qrcodes/qrcode.entity';
import { Place } from '../place/place.entity';
import { User } from '../users/user.entity';
import { AuthGuard } from '@nestjs/passport';

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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post('scan/:placeSlug/:qrCode/:time')
  @UseGuards(AuthGuard())
  async scan(
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
          })
          .catch((e) => {
            return {
              success: false,
              message: "Erreur ce qrCode n'existe pas !" + e.message,
            };
          });
      })
      .catch((e) => {
        return {
          success: false,
          message: "Erreur cette place n'existe pas ! : " + e.message,
        };
      });
  }

  @Get('getAll/:placeSlug/:userSlug')
  @UseGuards(AuthGuard())
  async getUserEntryInPlace(
    @Req() req: Request,
    @Param('placeSlug') placeSulg: string,
    @Param('userSlug') userSlug: string,
  ) {
    return this.placeRepository
      .findOne({ slug: placeSulg }, { relations: ['manager'] })
      .then((place) => {
        return this.userRepository
          .findOne({ slug: userSlug }, { relations: ['manager'] })
          .then((user) => {
            if (place.manager.slug === user.manager.slug) {
              return this.entryService.getUserEntriesInPlace(user, place);
            }
          })
          .catch((e) => {
            return {
              success: false,
              message: "Erreur cet user n'existe pas ! : " + e.message,
            };
          });
      })
      .catch((e) => {
        return {
          success: false,
          message: "Erreur cette place n'existe pas ! : " + e.message,
        };
      });
  }
}
