import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();  // so we can access data from the frontend without CORS being a problem
  await app.listen(3000);
}
bootstrap();
