import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ALLOW_ORIGIN_LIST, SERVER_PREFIX } from './configs/typeorm.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(SERVER_PREFIX);
  app.enableCors({
    origin: (origin, callback) => {
      // allow requests with no origin like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (!ALLOW_ORIGIN_LIST.includes(origin)) {
        return callback(
          new Error(
            'The CORS policy for this site does not allow access from the specified Origin.',
          ),
          false,
        );
      }
      return callback(null, true);
    },
    // TODO 인증서 여부 환경변수로 받기
    credentials: false,
  });
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap()
  .then(() => {
    console.log('🙆🏻‍♀️Nest application successfully started');
  })
  .catch((error) => {
    console.log(`❌Error: ${error}`);
  });
