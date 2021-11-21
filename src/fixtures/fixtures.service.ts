import { Injectable } from '@nestjs/common';
import { User } from '../entities/users/user.entity';
import { Place } from '../entities/place/place.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Qrcode } from '../entities/qrcodes/qrcode.entity';
import { Entry } from '../entities/entry/entry.entity';
import slugify from 'slugify';
import * as Str from '@supercharge/strings';
import * as Faker from 'faker';
import * as QRCodeGenerator from 'qrcode';

@Injectable()
export class FixturesService {
  private usersManager: User[];
  private users: User[];
  private places: Place[];

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {
    this.usersManager = [];
    this.users = [];
    this.places = [];
  }

  async generateData(): Promise<void> {
    await this.fakeIt('UserManager');
    await this.fakeIt('User');
    await this.fakeIt('QrCode');
    await this.fakeIt('Place');
    await this.fakeIt('Entry');
  }

  public async fakeIt(entityType: string): Promise<void> {
    switch (entityType) {
      case 'UserManager':
        return await this.addData(
          this.userManagerData(),
          User,
          (data: User[]) => (this.usersManager = data),
        );
      case 'User':
        return await this.addData(
          this.userData(),
          User,
          (data: User[]) => (this.users = data),
        );
      case 'QrCode':
        return await this.addData(this.qrCodeData(), Qrcode);
      case 'Place':
        return await this.addData(
          this.placeData(),
          Place,
          (data: Place[]) => (this.places = data),
        );
      case 'Entry':
        return await this.addData(this.entryData(), Entry);
      default:
        break;
    }

    return null;
  }

  private userManagerData(): Array<Partial<User>> {
    return Array.from({ length: 20 }).map((value, index) => {
      const firstname = Faker.name.firstName();
      const lastname = Faker.name.lastName();
      const slug = firstname + ' ' + lastname + ' ' + (index + 1);

      return {
        slug: slugify(slug, '_'),
        email: Faker.internet.email(),
        lastName: lastname,
        firstName: firstname,
        phone: Faker.phone.phoneNumberFormat(),
        password:
          '$2b$12$U/FJ9jRThDWeu6viiVPnCeQBbjM5I5cfNd5929ly6Lx1Y1MlGuTRC', // password_1
        birthDay: Faker.random.arrayElement([
          new Date('1990-01-01'),
          new Date('1980-01-01'),
          new Date('1985-01-01'),
          new Date('2000-01-01'),
          new Date('1983-01-01'),
          new Date('1993-01-01'),
          new Date('1995-01-01'),
          new Date('1991-01-01'),
          new Date('1989-01-01'),
        ]),
        role: ['ROLE_USER', 'ROLE_MANAGER'],
      };
    });
  }

  private userData(): Array<Partial<User>> {
    return Array.from({ length: 100 }).map((value, index) => {
      const firstname = Faker.name.firstName();
      const lastname = Faker.name.lastName();
      const slug = firstname + ' ' + lastname + ' ' + (index + 1);

      return {
        slug: slugify(slug, '_'),
        email: Faker.internet.email(),
        lastName: lastname,
        firstName: firstname,
        phone: Faker.phone.phoneNumberFormat(),
        password:
          '$2b$12$U/FJ9jRThDWeu6viiVPnCeQBbjM5I5cfNd5929ly6Lx1Y1MlGuTRC',
        birthDay: Faker.random.arrayElement([
          new Date('1995-01-01'),
          new Date('1988-01-01'),
          new Date('1989-01-01'),
          new Date('2003-01-01'),
          new Date('1989-01-01'),
          new Date('1999-01-01'),
          new Date('2001-01-01'),
          new Date('2005-01-01'),
          new Date('1999-01-01'),
        ]),
        role: ['ROLE_USER'],
        manager: Faker.random.arrayElement(this.usersManager),
      };
    });
  }

  private qrCodeData(): Array<Partial<Qrcode>> {
    const allUsers = this.usersManager.concat(this.users);

    return allUsers.map((user) => {
      const random = Str.random();
      const codeRandom = random + '_' + new Date().getTime();
      let url = '';

      QRCodeGenerator.toDataURL(codeRandom).then((value) => {
        return (url = value);
      });

      // generate a unique code
      let str = user.firstName + ' ' + user.lastName;
      let matches = str.match(/\b(\w)/g); // ['J','S','O','N']
      let acronym = matches.join(''); // JSON

      return {
        code: (acronym + '0' + user.id).toUpperCase(),
        qrcode: codeRandom,
        qrcodeImgUrl: url,
        affectedAt: new Date(),
        owner: user,
      };
    });
  }

  private placeData(): Array<Partial<Place>> {
    const userManagers = this.usersManager;
    const nowDate = new Date();

    return userManagers.map((user, index) => {
      const name = Faker.company.companyName();

      return {
        slug: slugify(name + ' ' + (index + 1), '_'),
        name: name,
        start: new Date(
          nowDate.getFullYear(),
          nowDate.getMonth(),
          nowDate.getDay(),
          Faker.random.arrayElement([7, 8]),
          Faker.random.arrayElement([0, 30]),
          0,
        ),
        breakStart: new Date(
          nowDate.getFullYear(),
          nowDate.getMonth(),
          nowDate.getDay(),
          Faker.random.arrayElement([12, 13]),
          Faker.random.arrayElement([0, 30]),
          0,
        ),
        breakEnd: new Date(
          nowDate.getFullYear(),
          nowDate.getMonth(),
          nowDate.getDay(),
          Faker.random.arrayElement([14, 15]),
          Faker.random.arrayElement([0, 30]),
          0,
        ),
        end: new Date(
          nowDate.getFullYear(),
          nowDate.getMonth(),
          nowDate.getDay(),
          Faker.random.arrayElement([18, 19]),
          Faker.random.arrayElement([0, 30]),
          0,
        ),
        manager: user,
      };
    });
  }

  private entryData(): Array<Partial<Entry>> {
    const places = this.places;
    const users = this.users;
    let entries: Array<Partial<Entry>> = [];

    Array.from({ length: 100 }).map(() => {
      places.map((place) => {
        users.map((user) => {
          if (place.manager.slug === user.manager.slug) {
            const day = Faker.random.arrayElement([
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28,
            ]);
            const year = Faker.random.arrayElement([
              place.createdAt.getFullYear(),
              place.createdAt.getFullYear() + 1,
              place.createdAt.getFullYear() + 2,
              place.createdAt.getFullYear() + 3,
            ]);
            const month = Faker.random.arrayElement([
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
            ]);

            entries.push({
              day: new Date(year, month, day),
              start: new Date(
                2000,
                1,
                1,
                Faker.random.arrayElement([7, 8, 9, 10]),
                Faker.random.arrayElement([0, 15, 20, 30, 45]),
              ),
              breakStart: new Date(
                2000,
                1,
                1,
                Faker.random.arrayElement([11, 12, 13]),
                Faker.random.arrayElement([0, 15, 20, 30, 45]),
              ),
              breakEnd: new Date(
                2000,
                1,
                1,
                Faker.random.arrayElement([14, 15, 16]),
                Faker.random.arrayElement([0, 15, 20, 30, 45]),
              ),
              end: new Date(
                2000,
                1,
                1,
                Faker.random.arrayElement([17, 18, 19, 20]),
                Faker.random.arrayElement([0, 15, 20, 30, 45]),
              ),
              place: place,
              user: user,
            });
          }
        });
      });
    });

    return entries;
  }

  private async addData(
    data: Array<Partial<any>>,
    entity: any,
    callBack?: any,
  ) {
    return await this.entityManager.save(entity, data).then((savedData) => {
      if (callBack) {
        callBack(savedData);
      }
    });
  }
}
