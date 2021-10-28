import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { Entry } from '../entry/entry.entity';

@Entity('Place')
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  slug: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: {
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

  @ManyToOne(() => User, (user) => user.places)
  manager: User;

  @OneToMany(() => Entry, (entry) => entry.place)
  entries: Entry[];
}
