import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CheckSheetDocument } from './entity/checkSheet.schema';
import { Model } from 'mongoose';

@Injectable()
export class CheckSheetService {
  constructor(
    @InjectModel('CheckSheet')
    private readonly checkSheetModel: Model<CheckSheetDocument>,
  ) {}

  async createCheckSheet(data: any): Promise<CheckSheetDocument> {
    const newCheckSheet = new this.checkSheetModel(data);
    return await newCheckSheet.save();
  }

  async getAllCheckSheets(): Promise<CheckSheetDocument[]> {
    return await this.checkSheetModel.find().exec();
  }

  async getCheckSheetById(id: string): Promise<CheckSheetDocument | null> {
    return await this.checkSheetModel.findById(id).exec();
  }
}
