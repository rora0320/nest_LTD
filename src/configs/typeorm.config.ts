import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

export function TypeormConfig(configService: ConfigService) {
  const env = configService.get<string>('ENV');

  if (!['dev', 'prod'].includes(env ?? '')) {
    throw Error('반드시 dev,prod 중 하나의 환경에 속해야 합니다.');
  }

  return <TypeOrmModuleOptions>{
    type: configService.get(`DB_TYPE`),
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User],
    synchronize: !(process.env.DB_SYNCHRONIZE === 'false'), //설정 안하면 기본 true,
    logging: !(process.env.LOGGING === 'false'),
  };
}

export const ALLOW_ORIGIN_LIST = ['localhost:5000'];

export const SERVER_PREFIX = 'api';
