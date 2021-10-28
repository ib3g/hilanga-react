import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { userInfo } from 'os';
import { Place } from '../place/place.entity';

@Entity('Entry')
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @CreateDateColumn()
  day: {
    type: Date;
  };

  @ApiProperty()
  @CreateDateColumn()
  start: {
    type: Date;
  };

  @ApiProperty()
  @CreateDateColumn()
  breakStart: {
    type: Date;
  };

  @ApiProperty()
  @CreateDateColumn()
  breakEnd: {
    type: Date;
  };

  @ApiProperty()
  @CreateDateColumn()
  end: {
    type: Date;
  };

  @ManyToOne(() => Place, (place) => place.entries)
  place: Place;

  @ManyToOne(() => User)
  user: User;
}
