import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { Entry } from '../entry/entry.entity';
import { Timestamp } from '../../utils/timestamp';

@Entity('Place')
export class Place extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  slug: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'datetime' })
  start: Date;

  @ApiProperty()
  @Column({ type: 'datetime' })
  breakStart: Date;

  @ApiProperty()
  @Column({ type: 'datetime' })
  breakEnd: Date;

  @ApiProperty()
  @Column({ type: 'datetime' })
  end: Date;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.places)
  manager: User;

  @ApiProperty()
  @OneToMany(() => Entry, (entry) => entry.place)
  entries: Entry[];
}
