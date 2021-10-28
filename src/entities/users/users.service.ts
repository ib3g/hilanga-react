import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegistrationStatus } from '../../auth/interface/registration-status.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User) private readonly userRespository: Repository<User>,
  ) {}

  async register(data: CreateUserDto): Promise<RegistrationStatus> {
    return this.authService.register(data);
  }
}
