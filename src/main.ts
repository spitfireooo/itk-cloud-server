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

  console.log(configuration().port)
  console.log(configuration().database)

  await app.listen(4010);
}
bootstrap();
