import { GroupEntity } from '../entities/group.entity';
import { UserRole } from '../entities/user.entity';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  group: GroupEntity;

  @IsNotEmpty()
  isActive: boolean;
}
