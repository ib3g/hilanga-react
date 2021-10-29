import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { Place } from './place.entity';
import { ResponseStatus } from '../../auth/interface/response-status.interface';
import { CreatePlaceDto } from './dto/create-place.dto';
import slugify from 'slugify';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(User)
    private readonly userRespository: Repository<User>,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {}

  async getPlace(criteria, options = null) {
    return this.placeRepository.findOne(criteria, options);
  }

  // create
  async createPlace(
    data: CreatePlaceDto,
    currentUser?: Express.User,
  ): Promise<ResponseStatus> {
    let creatPlaceDto = { ...data };
    let status: ResponseStatus = {
      success: true,
      message: 'Opération effectuée!',
    };

    try {
      creatPlaceDto.manager = currentUser;
      creatPlaceDto.slug = '';
      const place = await this.placeRepository.save(creatPlaceDto);

      await this.placeRepository.update(place.id, {
        slug: slugify(place.name + ' 0' + place.id, '_'),
      });
    } catch (e) {
      status = {
        success: false,
        message: e.message,
      };
    }

    return status;
  }

  // update
  async updatePlace(
    data: UpdatePlaceDto,
    slug: string,
  ): Promise<ResponseStatus> {
    let status: ResponseStatus = {
      success: true,
      message: 'Opération effectuée!',
    };

    try {
      const placeToUpdate = await this.getPlace(
        { slug: slug },
        { relations: ['manager'] },
      );

      if (placeToUpdate) {
        // if name change, slug change too
        data.slug = slugify(data.name + ' 0' + placeToUpdate.id, '_');
        await this.placeRepository.update(placeToUpdate.id, { ...data });
      } else {
        status = {
          success: false,
          message: "Opération non effectuée, cette place n'existe pas !",
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

  // delete
  async deletePlace(slug: string, currentUser): Promise<ResponseStatus> {
    let status: ResponseStatus = {
      success: true,
      message: 'Opération effectuée!',
    };

    try {
      const placeToDelete = await this.getPlace(
        {
          slug: slug,
        },
        {
          relations: ['manager'],
        },
      );
      if (placeToDelete.manager.email === currentUser.email) {
        await this.placeRepository.softDelete({ slug: slug });
      } else {
        status = {
          success: false,
          message:
            "Opérations non effectuée, vous n'êtes pas le manager de cette place !",
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

  // delete
  async restorePlace(slug: string, currentUser): Promise<ResponseStatus> {
    let status: ResponseStatus = {
      success: true,
      message: 'Opération effectuée!',
    };

    try {
      await this.placeRepository.restore({ slug: slug });

      const placeToRestore = await this.getPlace(
        {
          slug: slug,
        },
        {
          relations: ['manager'],
        },
      );

      if (!(placeToRestore?.manager.email === currentUser.email)) {
        await this.placeRepository.softDelete({ slug: slug });
        status = {
          success: false,
          message:
            "Opérations non effectuée, vous n'êtes pas le manager de cette place !",
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

  // get all manager's places
  async getAllPlacesFormCurrentManager(currentUser) {
    return this.placeRepository.find({ manager: currentUser });
  }
}
