import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GroupEntity } from './group.entity';
import { SaltRounds } from '../../auth/constants';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ unique: true })
  id: string;

  @Column()
  password: string;

  @Column()
  userName: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER }) // ✅ enum 사용
  role: UserRole;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => GroupEntity) // ✅ ManyToOne: 유저 하나는 그룹 하나에 속함
  @JoinColumn({ name: 'groupCode', referencedColumnName: 'groupCode' }) // ✅ groupCode 기준으로 조인
  group: GroupEntity;

  @Column()
  isActive: boolean;

  @BeforeInsert()
  private async beforeInsert() {
    this.password = await bcrypt.hash(this.password, SaltRounds);
  }
}
