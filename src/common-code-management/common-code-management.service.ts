import { Injectable } from '@nestjs/common';
import { CreateCommonCodeManagementDto } from './dto/create-common-code-management.dto';
import { UpdateCommonCodeManagementDto } from './dto/update-common-code-management.dto';

@Injectable()
export class CommonCodeManagementService {
  create(createCommonCodeManagementDto: CreateCommonCodeManagementDto) {
    return 'This action adds a new commonCodeManagement';
  }

  findAll() {
    return `This action returns all commonCodeManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commonCodeManagement`;
  }

  update(id: number, updateCommonCodeManagementDto: UpdateCommonCodeManagementDto) {
    return `This action updates a #${id} commonCodeManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} commonCodeManagement`;
  }
}
