import { Module } from '@nestjs/common';
import { EntitiesController } from './entities.controller';
import { EntitiesService } from './entities.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Entity, EntitySchema } from "./schema/entity.schema";

@Module({
  imports: [MongooseModule.forFeature([
    { name: Entity.name, schema: EntitySchema }
  ])],
  controllers: [EntitiesController],
  providers: [EntitiesService]
})
export class EntitiesModule {}
