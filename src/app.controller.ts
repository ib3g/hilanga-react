import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users/user.entity';
import { Repository } from 'typeorm';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly appService: AppService,
  ) {}

  @Get('generateData')
  async generateData() {
    return this.appService.generateData();
  }
}
