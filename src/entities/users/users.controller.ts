import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { toUserDto } from '../../mapper';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    @InjectRepository(User) private readonly userRespository: Repository<User>,
  ) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllUserForConnectedManager(@Req() req: Request) {
    let users = [];
    const usersDb = await this.userRespository.find({
      where: { manager: req.user },
      relations: ['manager', 'qrCodes'],
    });
    usersDb.map((userDb) => {
      let user = toUserDto(userDb);
      user.manager = user.manager ? toUserDto(userDb.manager) : null;
      users.push(user);
    });

    return users;
  }

  @Post('register')
  @UseGuards(AuthGuard())
  async register(@Body() data: CreateUserDto, @Req() req: Request) {
    const currentUser = req.user;
    return this.userService.register(data, currentUser);
  }
}
