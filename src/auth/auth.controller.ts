import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginStatus } from './interface/login-status.interface';
import * as dotenv from 'dotenv';
import { AuthGuard } from '@nestjs/passport';

dotenv.config();
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }

  @Post('login')
  async login(
    @Body() data: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginStatus> {
    const jwt = await this.authService.login(data);

    return {
      success: true,
      expiresIn: process.env.EXPIRES_IN,
      accessToken: jwt,
    };
  }

  @Get('user')
  @UseGuards(AuthGuard())
  async authUser(@Req() req: Request) {
    try {
      return req.user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
