import { Injectable } from '@nestjs/common';
import { User } from '../entities/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Place } from '../entities/place/place.entity';
import { Entry } from '../entities/entry/entry.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
    private readonly entityManager: EntityManager,
  ) {}

  async getStats(
    placeSlug: string,
    userSlug?: string,
    dateStart?: Date,
    dateEnd?: Date,
  ) {
    let user = null;
    let options = {};

    if (userSlug) {
      user = await this.userRepository.findOne({ slug: userSlug });
    }

    if (user) {
      options = { ...options, user: user };
    }

    let place = await this.placeRepository.findOne(
      { slug: placeSlug },
      { relations: ['manager'] },
    );

    let entries = [];
    if (place) {
      options = { ...options, place: place };

      entries = await this.entryRepository.find({
        where: options,
        relations: ['user', 'place'],
      });

      if (dateStart && dateEnd) {
        entries = entries.filter((entry: Entry) => {
          let entryDate = entry.day;
          entryDate.setHours(0, 0, 0);
          return (
            entryDate >= new Date(dateStart) && entry.day <= new Date(dateEnd)
          );
        });
      } else if (dateStart && !dateEnd) {
        entries = entries.filter((entry: Entry) => {
          return (
            entry.day.getFullYear() === new Date(dateStart).getFullYear() &&
            entry.day.getMonth() === new Date(dateStart).getMonth() &&
            entry.day.getDate() === new Date(dateStart).getDate()
          );
        });
      }

      if (entries.length) {
        return this.generateStats(entries, dateStart, dateEnd);
      } else {
        return {
          stats: {},
          success: false,
          message: 'Aucune entry trouvé !',
        };
      }
    } else {
      return {
        stats: {},
        success: false,
        message: "Erreur cette place n'existe pas !",
      };
    }
  }

  generateStats(entries: Entry[], dateStart: Date, dateEnd: Date = null) {
    let starts = [];
    let breakStarts = [];
    let breakEnd = [];
    let ends = [];
    let stats = {};

    entries.map((entry: Entry) => {
      starts.push(entry.start ? entry.start.getTime() : null);
      breakStarts.push(entry.breakStart ? entry.breakStart.getTime() : null);
      breakEnd.push(entry.breakEnd ? entry.breakEnd.getTime() : null);
      ends.push(entry.end ? entry.end.getTime() : null);
    });

    let avgStart = this.moyenneTimestamps(starts);
    let avgbreakStarts = this.moyenneTimestamps(breakStarts);
    let avgbreakEnd = this.moyenneTimestamps(breakEnd);
    let avgends = this.moyenneTimestamps(ends);

    stats = {
      ...stats,
      starts: this.converTimesTampToTimeString(avgStart),
      breakStarts: this.converTimesTampToTimeString(avgbreakStarts),
      breakEnd: this.converTimesTampToTimeString(avgbreakEnd),
      ends: this.converTimesTampToTimeString(avgends),
    };

    return {
      dateStart: dateStart,
      dateEnd: dateEnd,
      stats: stats,
      success: true,
    };
  }

  moyenneTimestamps(timesTamps: number[]) {
    let avg = 0;
    let sum = 0;

    if (timesTamps.length) {
      sum = timesTamps.reduce((a, b) => {
        return a + b;
      });
      avg = sum / timesTamps.length;
    }

    return Math.round(avg);
  }

  converTimesTampToTimeString(timesTamp: number) {
    let date = new Date(timesTamp);
    let hours = date.getHours();
    let minutes = '0' + date.getMinutes();

    return hours + ':' + minutes.substr(-2);
  }
}
