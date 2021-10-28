import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(User) private readonly userRespository: Repository<User>,
  ) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllUser() {
    return this.userRespository.find();
  }

  @Post('register')
  @UseGuards(AuthGuard())
  async register(@Body() data: CreateUserDto) {
    return this.userService.register(data);
  }
}
