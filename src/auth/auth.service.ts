import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { toUserDto } from '../mapper';
import { UserDto } from '../users/dto/user.dto';
import { RegistrationStatus } from './interface/registration-status.interface';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRespository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };
    // check if the user exists in the db by email
    const userWithEmail = await this.userRespository.findOne({
      where: { email: data.email },
    });

    // check if the user exists in the db by phone
    const userWithPhone = await this.userRespository.findOne({
      where: { phone: data.phone },
    });

    if (userWithEmail || userWithPhone) {
      throw new ConflictException('User already exists');
    }

    try {
      const hashPassword = await bcrypt.hash(data.password, 12);
      let createdUser = { ...data };
      createdUser.password = hashPassword;

      await this.userRespository.save(createdUser);
    } catch (e) {
      status = {
        success: false,
        message: e,
      };
    }

    return status;
  }

  async login(data: any): Promise<string> {
    const user = await this.userRespository.findOne({ email: data.email });

    if (!user) {
      throw new BadRequestException('Invalid crédentials');
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new BadRequestException('Invalid crédentials');
    }

    return this.jwtService.sign({ email: user.email });
  }

  async findOne(condition: any): Promise<UserDto> {
    const user = await this.userRespository.findOne(condition);

    return toUserDto(user);
  }

  async getCurrentUser(cookie: string): Promise<UserDto> {
    const data = await this.jwtService.verifyAsync(cookie);

    if (!data) {
      throw new UnauthorizedException();
    }

    return await this.findOne({ email: data['email'] });
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.findOne(payload);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
