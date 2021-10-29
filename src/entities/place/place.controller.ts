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
import { PlaceService } from './place.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './place.entity';
import { Repository } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreatePlaceDto } from './dto/create-place.dto';

@Controller('place')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {}

  @Get('allPlaces')
  @UseGuards(AuthGuard())
  async getAllPlaces(@Req() req: Request) {
    return this.placeService.getAllPlacesFormCurrentManager(req.user);
  }

  @Post('create')
  @UseGuards(AuthGuard())
  async createPlace(@Body() data: CreatePlaceDto, @Req() req: Request) {
    return this.placeService.createPlace(data, req.user);
  }

  @Put('update/:slug')
  @UseGuards(AuthGuard())
  async updatePlace(@Body() data: CreatePlaceDto, @Param('slug') slug: string) {
    return this.placeService.updatePlace(data, slug);
  }

  @Delete('delete/:slug')
  @UseGuards(AuthGuard())
  async deletePlace(@Param('slug') slug: string, @Req() req: Request) {
    return this.placeService.deletePlace(slug, req.user);
  }

  @Get('restore/:slug')
  @UseGuards(AuthGuard())
  async restorePlace(@Param('slug') slug: string, @Req() req: Request) {
    return this.placeService.restorePlace(slug, req.user);
  }
}
