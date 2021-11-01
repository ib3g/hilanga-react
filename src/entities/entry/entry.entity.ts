import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { Place } from '../place/place.entity';
import { Timestamp } from '../../utils/timestamp';

@Entity('Entry')
export class Entry extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @CreateDateColumn({
    update: false,
  })
  day: Date;

  @ApiProperty()
  @Column({ type: 'datetime', default: null, nullable: true })
  start: Date;
  @ApiProperty()
  @Column({ type: 'datetime', default: null, nullable: true })
  breakStart: Date;

  @ApiProperty()
  @Column({ type: 'datetime', default: null, nullable: true })
  breakEnd: Date;

  @ApiProperty()
  @Column({ type: 'datetime', default: null, nullable: true })
  end: Date;

  @ApiProperty()
  @ManyToOne(() => Place, (place) => place.entries)
  place: Place;

  @ApiProperty()
  @ManyToOne(() => User)
  user: User;
}
