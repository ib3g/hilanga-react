import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QrcodesModule } from './qrcodes/qrcodes.module';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { PlaceModule } from './place/place.module';
import { EntryModule } from './entry/entry.module';

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
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    QrcodesModule,
    AuthModule,
    PlaceModule,
    EntryModule,
  ],
})
export class AppModule {}
