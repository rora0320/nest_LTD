import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user); // 업데이트된 값 저장
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneOrFail({ where: { id: id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const updatedUser = { ...user, ...updateUserDto };
    return this.usersRepository.update(id, updatedUser);
  }

  async remove(id: string): Promise<User | null> {
    const user = await this.findOne(id);
    if (!user) return null; // 유저가 없으면 null 반환

    user.isActive = !user.isActive; // 현재 값 반전
    return this.usersRepository.save(user); // 업데이트된 값 저장
  }
}
