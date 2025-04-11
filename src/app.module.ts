import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose"
import { UsersModule } from './users/users.module';
import { EntitiesModule } from './entities/entities.module';
import { AuthModule } from './auth/auth.module';
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRoot(configuration().database),
    UsersModule,
    EntitiesModule,
    AuthModule,
  ],
})
export class AppModule {}
