import { DataSource } from 'typeorm';
import { Client } from 'pg';
import { seedGroups } from './group.seed';
import { User } from '../users/entities/user.entity';
import { GroupEntity } from '../users/entities/group.entity';
import * as dotenv from 'dotenv';

dotenv.config();

// export const AppDataSource = new DataSource({
//   type: 'mariadb', // 데이터베이스 타입 (MySQL, PostgreSQL 등)
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   entities: [User, GroupEntity], // 🔥 엔티티 추가
//   synchronize: true,
// });

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

// ✅ 데이터베이스 생성 함수
const createDatabaseIfNotExists = async () => {
  const client = new Client({
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: 'postgres', // 기본 DB 사용
  });

  await client.connect();

  const res = await client.query(
    `SELECT 1 FROM pg_database WHERE datname = '${POSTGRES_DB}';`,
  );

  if (res.rowCount === 0) {
    console.log(`🌱 데이터베이스(${POSTGRES_DB}) 생성 중...`);
    await client.query(`CREATE DATABASE ${POSTGRES_DB};`);
    console.log(`✅ 데이터베이스(${POSTGRES_DB}) 생성 완료!`);
  } else {
    console.log(`✅ 데이터베이스(${POSTGRES_DB})가 이미 존재합니다.`);
  }

  await client.end();
};

export const AppDataSource = new DataSource({
  type: 'postgres', // 데이터베이스 타입 (MySQL, PostgreSQL 등)
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, GroupEntity], // 🔥 엔티티 추가
  synchronize: true,
});

const seedDatabase = async () => {
  await createDatabaseIfNotExists();
  await AppDataSource.initialize(); // ✅ DB 연결
  console.log('✅ Database connected!');

  await seedGroups(AppDataSource); // ✅ 그룹 데이터 삽입

  await AppDataSource.destroy(); // ✅ DB 연결 해제
  console.log('✅Database disconnected!');
};

seedDatabase().catch((error) => console.error('❌ Seeding failed:', error));
