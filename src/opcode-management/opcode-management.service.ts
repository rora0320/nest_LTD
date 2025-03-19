import { Injectable } from '@nestjs/common';
import { CreateOpcodeManagementDto } from './dto/create-opcode-management.dto';
import { UpdateOpcodeManagementDto } from './dto/update-opcode-management.dto';

@Injectable()
export class OpcodeManagementService {
  create(createOpcodeManagementDto: CreateOpcodeManagementDto) {
    return 'This action adds a new opcodeManagement';
  }

  findAll() {
    return `This action returns all opcodeManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} opcodeManagement`;
  }

  update(id: number, updateOpcodeManagementDto: UpdateOpcodeManagementDto) {
    return `This action updates a #${id} opcodeManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} opcodeManagement`;
  }
}
