import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

class Group {
  @Prop({ required: true })
  code: number;
  @Prop({ required: true })
  value: string;
}

// 1. 중첩된 구조를 위한 클래스 정의
class WorkStep {
  @Prop()
  first: number;

  @Prop()
  second: number;
}

class TransformationStep {
  @Prop()
  assembly: WorkStep;
  @Prop()
  disassembly: WorkStep;
  @Prop()
  total: WorkStep;
}

class WorkProcedure extends TransformationStep {
  @Prop()
  No: number;

  @Prop({ required: true })
  workingValue: string; // working procedure

  @Prop({ required: true })
  derivation: boolean; // 파생유무

  @Prop()
  remark: string; //비고
}

@Schema()
export class CheckSheetDocument extends Document {
  @Prop({ required: true })
  vehicle: string;
  @Prop({ required: true })
  engine: string;
  @Prop({ required: true })
  year: string;

  @Prop()
  gubun?: string; //PE,

  @Prop({ required: true })
  worker: string;
  @Prop({ required: true })
  checker: string;
  @Prop({ required: true })
  LTM: string;

  @Prop({ type: Group, required: true })
  mainGroup: Group;
  @Prop({ type: Group, required: true })
  subGroup: Group;

  @Prop({ required: true })
  OpCode: string;
  @Prop({ required: true })
  OpName: string;

  @Prop({ type: [WorkProcedure] })
  WP: WorkProcedure[];

  @Prop()
  TOTAL: TransformationStep; //working prcedure total

  @Prop({ required: true })
  status: boolean;
}

export const CheckSheetSchema =
  SchemaFactory.createForClass(CheckSheetDocument);
