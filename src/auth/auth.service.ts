import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../entities/users/dto/create-user.dto';
import { toUserDto } from '../mapper';
import { UserDto } from '../entities/users/dto/user.dto';
import { ResponseStatus } from './interface/response-status.interface';
import { JwtPayload } from './interface/jwt-payload.interface';
import slugify from 'slugify';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRespository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async checkIfUserExist(data) {
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
  }

  async register(
    data: CreateUserDto,
    additionalRoles?: string[],
  ): Promise<ResponseStatus> {
    // init proprieties
    additionalRoles = additionalRoles?.length ? additionalRoles : [];

    let status: ResponseStatus = {
      success: true,
      message: 'user registered',
    };

    await this.checkIfUserExist(data);

    try {
      const hashPassword = await bcrypt.hash(data.password, 12);
      let createdUser = { ...data };
      createdUser.password = hashPassword;
      additionalRoles.push('ROLE_USER');
      createdUser.role = additionalRoles;
      createdUser.slug = '';
      const user = await this.userRespository.save(createdUser);

      await this.userRespository.update(user.id, {
        slug: slugify(
          user.firstName + ' ' + user.lastName + ' 0' + user.id,
          '_',
        ),
      });
    } catch (e) {
      status = {
        success: false,
        message: e.message,
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

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.findOne(payload);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
