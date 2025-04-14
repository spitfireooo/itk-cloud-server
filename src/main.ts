import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from "./config/configuration";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: "*",
    allowedHeaders: "*",
    credentials: true
  })
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  await app.listen(configuration().port);
}
bootstrap();
