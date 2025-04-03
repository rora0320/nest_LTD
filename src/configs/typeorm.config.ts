import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { GroupEntity } from '../users/entities/group.entity';

export function TypeormConfig(configService: ConfigService) {
  const env = configService.get<string>('ENV');

  if (!['dev', 'prod'].includes(env ?? '')) {
    throw Error('반드시 dev,prod 중 하나의 환경에 속해야 합니다.');
  }

  return <TypeOrmModuleOptions>{
    type: configService.get(`POSTGRES_TYPE`),
    port: Number(process.env.POSTGRES_PORT),
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, GroupEntity],
    synchronize: !(process.env.DB_SYNCHRONIZE === 'false'), //설정 안하면 기본 true,
    logging: !(process.env.LOGGING === 'false'),
  };
}

export const ALLOW_ORIGIN_LIST: string[] = ['http://localhost:5173'];

export const SERVER_PREFIX: string = 'api';
