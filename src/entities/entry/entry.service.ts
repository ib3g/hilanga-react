import { Injectable } from '@nestjs/common';
import { Qrcode } from '../qrcodes/qrcode.entity';
import { AuthService } from '../../auth/auth.service';
import { Place } from '../place/place.entity';
import { ResponseStatus } from '../../auth/interface/response-status.interface';
import { Entry } from './entry.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class EntryService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
  ) {}

  async createOrUpdate(
    qrCode: Qrcode,
    place: Place,
    time: string,
  ): Promise<ResponseStatus> {
    let status: ResponseStatus = {
      success: true,
      message: 'Opération effectuée !',
    };

    // get the qrCode's user
    const user = await this.authService.findOne({ qrCode: qrCode });

    if (!user) {
      return {
        success: false,
        message: "Cet utilisateur n'existe pas !",
      };
    }

    if (user.manager?.slug !== place.manager?.slug) {
      return {
        success: false,
        message:
          "Vous n'avez pas l'autorisation pour effectuer cette opération !",
      };
    }

    // if user has a entry today
    let userEntries = await this.getUserEntriesInPlace(user, place);

    let entryOfTheDay = userEntries.filter((entry) => {
      return (
        entry.day.getDate() === new Date().getDate() &&
        entry.day.getMonth() === new Date().getMonth() &&
        entry.day.getFullYear() === new Date().getFullYear()
      );
    })[0];

    if (entryOfTheDay) {
      const data = this.updateTime(entryOfTheDay, time);

      if (!data) {
        return {
          success: false,
          message: "Vous vous êtes déjà scanner à cette heure aujourd'hui",
        };
      }

      await this.entryRepository.update(entryOfTheDay.id, data);
    } else {
      // else create an entry for the user
      let entry = new Entry();
      entry.user = user;
      entry.place = place;

      entry = await this.entryRepository.save(entry);
      const data = this.updateTime(entry, time);

      if (data) {
        await this.entryRepository.update(entry.id, data);
      }
    }

    return status;
  }

  async getUserEntriesInPlace(user: User, place: Place) {
    return await this.entryRepository.find({ user: user, place: place });
  }

  updateTime(entry: Entry, time) {
    let data = null;
    switch (time) {
      case 'start':
        if (entry.start === null) data = { start: new Date() };
        break;
      case 'breakStart':
        if (entry.breakStart === null) data = { breakStart: new Date() };
        break;
      case 'breakEnd':
        if (entry.breakEnd === null) data = { breakEnd: new Date() };
        break;
      case 'end':
        if (entry.end === null) data = { end: new Date() };
        break;
    }

    return data;
  }
}
