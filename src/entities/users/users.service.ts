import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseStatus } from '../../auth/interface/response-status.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import slugify from 'slugify';

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User) private readonly userRespository: Repository<User>,
  ) {}

  getUser(criteria, options = null) {
    const user = this.userRespository.findOne(criteria, options);

    if (!user) {
      return null;
    }

    return user;
  }

  async registerUser(
    data: CreateUserDto,
    currentUser?: Express.User,
  ): Promise<ResponseStatus> {
    let userDto = { ...data };
    userDto.manager = currentUser;
    return this.authService.register(userDto, []);
  }

  async updateUser(data: UpdateUserDto, slug: string): Promise<ResponseStatus> {
    let status: ResponseStatus = {
      success: true,
      message: 'Opération effectuée !',
    };

    await this.authService.checkIfUserExist(data);

    try {
      const userToUpdate = await this.getUser({ slug: slug });
      if (userToUpdate) {
        // if name change, slug change too
        data.slug = slugify(
          data.firstName + ' ' + data.lastName + ' 0' + userToUpdate.id,
          '_',
        );
        await this.userRespository.update(userToUpdate.id, { ...data });
      } else {
        status = {
          success: false,
          message: "Opération non effectuée, cet user n'existe pas !",
        };
      }
    } catch (e) {
      status = {
        success: false,
        message: e.message,
      };
    }

    return status;
  }

  async deleteUser(slug: string, currentUser?: any): Promise<ResponseStatus> {
    let status: ResponseStatus = {
      success: true,
      message: 'Opération effectuée !',
    };

    try {
      const userToDelete = await this.getUser(
        {
          slug: slug,
        },
        {
          relations: ['manager'],
        },
      );

      if (!userToDelete) {
        return {
          success: false,
          message: "Opérations non effectuée, cet utiliateur n'existe pas !",
        };
      }

      if (userToDelete.manager.email === currentUser.email) {
        await this.userRespository.softDelete({ slug: slug });
      } else {
        status = {
          success: false,
          message:
            "Opérations non effectuée, vous n'êtes pas le manager de cet utilisateur !",
        };
      }
    } catch (e) {
      status = {
        success: false,
        message: e.message,
      };
    }

    return status;
  }

  async restoreUser(slug: string, currentUser?: any): Promise<ResponseStatus> {
    let status: ResponseStatus = {
      success: true,
      message: 'Opération effectuée !',
    };

    try {
      await this.userRespository.restore({ slug: slug });

      const userToRestore = await this.getUser(
        {
          slug: slug,
        },
        {
          relations: ['manager'],
        },
      );

      if (!(userToRestore?.manager.email === currentUser.email)) {
        await this.userRespository.softDelete({ slug: slug });
        status = {
          success: false,
          message:
            "Opérations non effectuée, vous n'êtes pas le manager de cet utilisateur !",
        };
      }
    } catch (e) {
      status = {
        success: false,
        message: e.message,
      };
    }

    return status;
  }
}
