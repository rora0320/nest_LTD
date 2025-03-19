import { ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonTypeEntity } from './common-type.entity';
import { Prop } from '@nestjs/mongoose';

export class CommonCodeEntity {
  //LTM, 엔진, 변속기, 엔진형식, 모델연도 하위항목 작성용
  @PrimaryGeneratedColumn()
  pk: number;

  //commontype 에서 선택한 걸로 들어가도록
  @ManyToOne(() => CommonTypeEntity, (commonType) => commonType.commonCode)
  commonType: CommonTypeEntity;

  @Prop({ required: true })
  //코드
  // 메인그룹 속성 중 엔진등록시 commonType: 2(commonType-typeName:메인그룹으로 등록 되어있을때 )code:200 codeValue:엔진
  code: string;

  //코드명칭
  @Prop({ required: true })
  codeValue: string;

  // 사용유무
  @Prop({ required: true })
  status: boolean;
}
