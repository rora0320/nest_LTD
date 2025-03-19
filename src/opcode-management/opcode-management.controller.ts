import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpcodeManagementService } from './opcode-management.service';
import { CreateOpcodeManagementDto } from './dto/create-opcode-management.dto';
import { UpdateOpcodeManagementDto } from './dto/update-opcode-management.dto';

@Controller('opcode-management')
export class OpcodeManagementController {
  constructor(private readonly opcodeManagementService: OpcodeManagementService) {}

  @Post()
  create(@Body() createOpcodeManagementDto: CreateOpcodeManagementDto) {
    return this.opcodeManagementService.create(createOpcodeManagementDto);
  }

  @Get()
  findAll() {
    return this.opcodeManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opcodeManagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpcodeManagementDto: UpdateOpcodeManagementDto) {
    return this.opcodeManagementService.update(+id, updateOpcodeManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opcodeManagementService.remove(+id);
  }
}
