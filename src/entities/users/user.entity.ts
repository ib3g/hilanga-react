import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Qrcode } from '../qrcodes/qrcode.entity';
import { Place } from '../place/place.entity';
import { Timestamp } from '../../utils/timestamp';

@Entity('Users')
export class User extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  slug: string;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column({ type: 'simple-array' })
  role: string[];

  @ApiProperty()
  @Column({
    unique: true,
  })
  phone: string;

  @ApiProperty()
  @Column({
    nullable: false,
  })
  password: string;

  @ApiProperty()
  @ManyToOne(() => User)
  manager: User;

  @ApiProperty()
  @OneToMany(() => Qrcode, (qrCode) => qrCode.user)
  qrCodes: Qrcode[];

  @ApiProperty()
  @OneToMany(() => Place, (place) => place.manager)
  places: Place[];
}
