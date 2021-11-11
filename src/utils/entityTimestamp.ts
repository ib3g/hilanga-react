import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class EntityTimestamp {
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
