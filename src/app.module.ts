import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from './configs/typeorm.config';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckSheetModule } from './check-sheet/check-sheet.module';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { CommonCodeManagementModule } from './common-code-management/common-code-management.module';
import { OpcodeManagementModule } from './opcode-management/opcode-management.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: TypeormConfig,
    }),
    MongooseModule.forRoot(
      // 관리자 계정으로 admin 데이터베이스에 로그인
      // mongo -u admin -p password --authenticationDatabase admin
      // 몽고는 데이터베이스에 따라 사용자 계정 만들어야함 사용자 계정만드는 방법은
      // use 데이터베이스이름
      //     db.createUser({
      //       user: "mongo",
      //       pwd: "yourpassword",  // 원하는 비밀번호 입력
      //       roles: [{ role: "readWrite", db: "test" }]
      //     })
      // 'mongodb://mongo1:mongo!@localhost:27017,localhost:27018,localhost:27019/test?replicaSet=rs0',
      // 'mongodb://mongo:mongo!@mongodb-1:27017,mongodb-2:27018,mongodb-3:27019/admin?replicaSet=rs0',

      //계정 안만들고도 가능
      'mongodb://mongodb-1-test:27017,mongodb-2-test:27018,mongodb-3-test:27019/test?replicaSet=rs0',
      // `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/mongodb?authSource=admin`,
    ),
    ElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_NODE,
    }),
    CheckSheetModule,
    CommonCodeManagementModule,
    OpcodeManagementModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
