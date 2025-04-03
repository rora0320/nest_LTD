import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupEntity } from './group.entity';

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
}
