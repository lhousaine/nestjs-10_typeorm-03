import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  app.use(helmet());
  app.enableCors();
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
