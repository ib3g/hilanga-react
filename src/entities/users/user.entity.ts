import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
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
  @Column({ nullable: true })
  birthDay: Date;

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
  @OneToOne(() => Qrcode, (qrCode) => qrCode.owner)
  qrCode: Qrcode;

  @ApiProperty()
  @OneToMany(() => Place, (place) => place.manager)
  places: Place[];
}
