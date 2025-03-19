import { Prop } from '@nestjs/mongoose';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CommonGroupEntity {
  //메인그룹, 서브그룹 하위 항목용
  @PrimaryGeneratedColumn()
  pk: number;

  @Prop({ required: true })
  isMainGroup: boolean; //메인그룹이면 true 아니면 false
  //코드
  // 메인그룹 속성 중 엔진등록시 commonType: 2(commonType-typeName:메인그룹으로 등록 되어있을때 )code:200 codeValue:엔진
  @Prop({ required: true })
  code: string;

  //코드명칭
  @Prop({ required: true })
  codeValue: string;

  // 사용유무
  @Prop({ required: true })
  status: boolean;
}
