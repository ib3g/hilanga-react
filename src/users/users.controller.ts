import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(User) private readonly userRespository: Repository<User>,
  ) {}

  @Get()
  async getAllUser() {
    return this.userRespository.find();
  }
}
