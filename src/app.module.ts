import { Module } from '@nestjs/common';
import { UsersModule } from './entities/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QrcodesModule } from './entities/qrcodes/qrcodes.module';
import { User } from './entities/users/user.entity';
import { AuthModule } from './auth/auth.module';
import { PlaceModule } from './entities/place/place.module';
import { EntryModule } from './entities/entry/entry.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatisticsModule } from './statistics/statistics.module';
import { FixturesModule } from './fixtures/fixtures.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'barry',
      password: 'barry',
      database: 'hilanga',
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['migration/*.ts'],
      cli: {
        migrationsDir: 'migration',
      },
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    QrcodesModule,
    AuthModule,
    PlaceModule,
    EntryModule,
    StatisticsModule,
    FixturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
