import { Module } from '@nestjs/common';
import { CheckSheetService } from './check-sheet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckSheetSchema } from './entity/checkSheet.schema';
import { CheckSheetController } from './check-sheet.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CheckSheet', schema: CheckSheetSchema },
    ]),
  ],
  controllers: [CheckSheetController],
  providers: [CheckSheetService],
  exports: [CheckSheetService],
})
export class CheckSheetModule {}
