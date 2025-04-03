import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from '../entities/user.entity';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  userName?: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  isActive?: boolean;
}
