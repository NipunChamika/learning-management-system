import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow requests from frontend
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
