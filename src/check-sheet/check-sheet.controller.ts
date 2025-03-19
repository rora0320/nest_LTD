import { Body, Controller, Post } from '@nestjs/common';
import { CheckSheetService } from './check-sheet.service';
import { CheckSheetDocument } from './entity/checkSheet.schema';

@Controller('check-sheet')
export class CheckSheetController {
  constructor(private readonly checkSheetService: CheckSheetService) {}

  @Post()
  async create(@Body() data: any): Promise<CheckSheetDocument> {
    console.log('test????', data);
    return this.checkSheetService.createCheckSheet(data);
  }
}
