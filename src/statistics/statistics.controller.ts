import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users/user.entity';
import { Repository } from 'typeorm';
import { StatisticsService } from './statistics.service';
import { AuthGuard } from '@nestjs/passport';
import { statsParamsDto } from './dto/statsParams.dto';

@Controller('statistics')
export class StatisticsController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly statisticsService: StatisticsService,
  ) {}

  @Post('/:placeSlug')
  @UseGuards(AuthGuard())
  async getAllStats(
    @Body() data: statsParamsDto,
    @Param('placeSlug') placeSulg: string,
  ) {
    return this.statisticsService.getStats(
      placeSulg,
      data.userSlug,
      data.dateStart,
      data.dateEnd,
    );
  }

  getStatsByDay() {}
  getStatsByMonth() {}
  getStatsByYear() {}
  getStatsFromThisDate() {}
  getStatsBetweenTheseDates() {}
}
