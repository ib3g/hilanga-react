import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class Timestamp {
  @ApiProperty()
  @CreateDateColumn({
    update: false,
  })
  createdAt;

  @ApiProperty()
  @UpdateDateColumn()
  upadatedAt;

  @ApiProperty()
  @DeleteDateColumn()
  delectedAt;
}
