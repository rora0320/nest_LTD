import { PartialType } from '@nestjs/mapped-types';
import { CreateCommonCodeManagementDto } from './create-common-code-management.dto';

export class UpdateCommonCodeManagementDto extends PartialType(CreateCommonCodeManagementDto) {}
