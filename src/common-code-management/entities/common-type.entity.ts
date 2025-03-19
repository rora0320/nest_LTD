import { Prop } from '@nestjs/mongoose';
import { OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonGroupEntity } from './common-group.entity';

export class CommonTypeEntity {
  //LTM, 엔진, 변속기등등 타입을 선택할 수 있는 select Table로 만드는 용
  @PrimaryGeneratedColumn()
  pk: number;

  @Prop({ required: true })
  typeName: string;

  @OneToMany(() => CommonGroupEntity, (commonGroup) => commonGroup.pk)
  commonCode: CommonGroupEntity[];
}
