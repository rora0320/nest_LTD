import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  pk: number;

  @Column()
  id: string;

  @Column()
  password: string;

  @Column()
  userName: string;

  @Column()
  role: string;

  @Column()
  email: string;
}
