import { Module } from '@nestjs/common';
import { FixturesService } from './fixtures.service';
import { FixturesController } from './fixtures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [FixturesService],
  controllers: [FixturesController],
})
export class FixturesModule {}
