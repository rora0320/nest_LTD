import { Module } from '@nestjs/common';
import { OpcodeManagementService } from './opcode-management.service';
import { OpcodeManagementController } from './opcode-management.controller';

@Module({
  controllers: [OpcodeManagementController],
  providers: [OpcodeManagementService],
})
export class OpcodeManagementModule {}
