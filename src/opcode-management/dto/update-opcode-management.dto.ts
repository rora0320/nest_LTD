import { PartialType } from '@nestjs/mapped-types';
import { CreateOpcodeManagementDto } from './create-opcode-management.dto';

export class UpdateOpcodeManagementDto extends PartialType(CreateOpcodeManagementDto) {}
