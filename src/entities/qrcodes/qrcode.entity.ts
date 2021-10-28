import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

@Entity('QrCode')
export class Qrcode {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  slug: string;

  @ApiProperty()
  @Column()
  code: string;

  @ApiProperty()
  @Column()
  qrcode: string;

  @ApiProperty()
  @Column()
  qrcodeImgUrl: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: {
    type: Date;
    required: true;
  };

  @ApiProperty()
  @CreateDateColumn()
  affectedAt: {
    type: Date;
  };

  @ApiProperty()
  @CreateDateColumn()
  printedAt: {
    type: Date;
  };

  @ManyToOne(() => User, (user) => user.qrCodes)
  user: User;
}
