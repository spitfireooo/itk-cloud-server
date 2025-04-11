import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Entity } from "./schema/entity.schema";
import { Model } from "mongoose";

@Injectable()
export class EntitiesService {
  constructor(@InjectModel(Entity.name) private entityModel: Model<Entity>) {}

  getAll(): Promise<Entity[]> {
    return this.entityModel.find().exec();
  }

  getOne(id: string): Promise<Entity> {
    return this.entityModel.findById(id).exec();
  }
}
