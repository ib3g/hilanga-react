import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { Timestamp } from '../../utils/timestamp';

@Entity('QrCode')
export class Qrcode extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  code: string;

  @ApiProperty()
  @Column()
  qrcode: string;

  @ApiProperty()
  @Column({ type: 'longtext' })
  qrcodeImgUrl;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  affectedAt: Date;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  printedAt: Date;

  @ApiProperty()
  @OneToOne(() => User, (user) => user.qrCode)
  @JoinColumn()
  owner: User;
}
