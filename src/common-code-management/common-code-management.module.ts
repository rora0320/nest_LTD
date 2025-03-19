import { Module } from '@nestjs/common';
import { CommonCodeManagementService } from './common-code-management.service';
import { CommonCodeManagementController } from './common-code-management.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonTypeEntity } from './entities/common-type.entity';
import { CommonCodeEntity } from './entities/common-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommonCodeEntity, CommonTypeEntity])],
  controllers: [CommonCodeManagementController],
  providers: [CommonCodeManagementService],
})
export class CommonCodeManagementModule {}
