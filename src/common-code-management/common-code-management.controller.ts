import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommonCodeManagementService } from './common-code-management.service';
import { CreateCommonCodeManagementDto } from './dto/create-common-code-management.dto';
import { UpdateCommonCodeManagementDto } from './dto/update-common-code-management.dto';

@Controller('common-code-management')
export class CommonCodeManagementController {
  constructor(private readonly commonCodeManagementService: CommonCodeManagementService) {}

  @Post()
  create(@Body() createCommonCodeManagementDto: CreateCommonCodeManagementDto) {
    return this.commonCodeManagementService.create(createCommonCodeManagementDto);
  }

  @Get()
  findAll() {
    return this.commonCodeManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commonCodeManagementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommonCodeManagementDto: UpdateCommonCodeManagementDto) {
    return this.commonCodeManagementService.update(+id, updateCommonCodeManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commonCodeManagementService.remove(+id);
  }
}
