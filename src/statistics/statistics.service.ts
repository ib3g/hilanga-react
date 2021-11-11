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

  // Place ---------------------------------------
  // Moyenne des heures
  // par jour
  // par mois
  // par années
  // Depuis {date}
  // Entre {date} et {date}

  // TODO faux !! , revoir last valeur obtenu :
  //  {
  //     "stats": {
  //         "starts": "9:08",
  //         "breakStarts": "6:31",
  //         "breakEnd": "7:26",
  //         "ends": "20:47"
  //     }
  //  }
  async getAllStats(slug, userSlug = '') {
    let user = null;
    let options = {};
    let stats = {};

    if (userSlug) {
      user = await this.userRepository.findOne({ slug: userSlug });
    }

    if (user) {
      options = { ...options, user: user };
    }

    let place = await this.placeRepository.findOne(
      { slug: slug },
      { relations: ['manager'] },
    );

    let entries = [];

    if (place) {
      console.log('place');
      options = { ...options, place: place };
      entries = await this.entryRepository.find(options);

      if (entries) {
        let starts = [];
        let breakStarts = [];
        let breakEnd = [];
        let ends = [];

        entries.map((entry: Entry) => {
          starts.push(entry.start ? entry.start.getTime() : null);
          breakStarts.push(
            entry.breakStart ? entry.breakStart.getTime() : null,
          );
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
          stats: stats,
          success: true,
        };
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
  getStatsByDay() {}
  getStatsByMonth() {}
  getStatsByYear() {}
  getStatsFromThisDate() {}
  getStatsBetweenTheseDates() {}

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
    let date = new Date(timesTamp * 1000);
    let hours = date.getHours();
    let minutes = '0' + date.getMinutes();
    let seconds = '0' + date.getSeconds();

    return hours + ':' + minutes.substr(-2);
  }
}
