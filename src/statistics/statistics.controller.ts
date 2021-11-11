import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users/user.entity';
import { Repository } from 'typeorm';
import { StatisticsService } from './statistics.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('statistics')
export class StatisticsController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly statisticsService: StatisticsService,
  ) {}

  @Get('/:placeSlug/getAll')
  @UseGuards(AuthGuard())
  async getAllStats(
    @Req() req: Request,
    @Param('placeSlug') placeSulg: string,
  ) {
    return this.statisticsService.getAllStats(placeSulg);
  }

  getStatsByDay() {}
  getStatsByMonth() {}
  getStatsByYear() {}
  getStatsFromThisDate() {}
  getStatsBetweenTheseDates() {}
}
