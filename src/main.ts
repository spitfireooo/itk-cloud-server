import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from "./config/configuration";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: "*",
    allowedHeaders: "*",
    credentials: true
  })

  await app.listen(configuration().port);
}
bootstrap();
