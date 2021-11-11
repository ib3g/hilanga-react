import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users/user.entity';
import { Repository } from 'typeorm';
import { FixturesService } from './fixtures.service';

@Controller('fixtures')
export class FixturesController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly appService: FixturesService,
  ) {}

  @Get('generateData')
  async generateData() {
    return this.appService.generateData();
  }
}
