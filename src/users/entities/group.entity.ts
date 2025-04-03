import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GroupEntity {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column({ unique: true })
  groupCode: number;

  @Column()
  groupValue: string;

  //
  // @OneToMany(() => User, (user) => user.group) // ✅ 반대 관계 설정
  // users: User[];
}
