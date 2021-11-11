import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/users/user.entity';
import { Place } from '../entities/place/place.entity';
import { Entry } from '../entities/entry/entry.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Place, Entry]), AuthModule],
  providers: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
