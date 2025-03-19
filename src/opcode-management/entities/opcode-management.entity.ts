import { ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Prop } from '@nestjs/mongoose';
import { CommonGroupEntity } from '../../common-code-management/entities/common-group.entity';

export class OpcodeManagement {
  @PrimaryGeneratedColumn()
  pk: number;

  @ManyToOne(() => CommonGroupEntity, (group) => group.pk)
  main: CommonGroupEntity;
  @ManyToOne(() => CommonGroupEntity, (group) => group.pk)
  sub: CommonGroupEntity;

  @Prop({ required: true })
  opCode: string;
  @Prop({ required: true })
  opName: string;
}
