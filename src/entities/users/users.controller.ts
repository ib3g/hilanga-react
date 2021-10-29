import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
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
  async getAllUsersForConnectedManager(@Req() req: Request) {
    let users = [];
    const usersFromDb = await this.userRespository.find({
      where: { manager: req.user },
      relations: ['manager', 'qrCodes'],
    });
    usersFromDb.map((userFromDb) => {
      let user = toUserDto(userFromDb);
      user.manager = user.manager ? toUserDto(userFromDb.manager) : null;
      users.push(user);
    });

    return users;
  }

  @Post('registerUser')
  @UseGuards(AuthGuard())
  async registerUser(@Body() data: CreateUserDto, @Req() req: Request) {
    return this.userService.registerUser(data, req.user);
  }

  @Put('updateUser/:slug')
  @UseGuards(AuthGuard())
  async updateUser(@Body() data: CreateUserDto, @Param('slug') slug: string) {
    return this.userService.updateUser(data, slug);
  }

  @Delete('deleteUser/:slug')
  @UseGuards(AuthGuard())
  async deleteUser(@Param('slug') slug: string, @Req() req: Request) {
    return this.userService.deleteUser(slug, req.user);
  }

  @Get('restoreUser/:slug')
  @UseGuards(AuthGuard())
  async restoreUser(@Param('slug') slug: string, @Req() req: Request) {
    return this.userService.restoreUser(slug, req.user);
  }
}
