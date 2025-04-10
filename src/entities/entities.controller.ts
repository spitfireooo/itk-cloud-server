import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { EntitiesService } from "./entities.service";
import { Entity } from "./schema/entity.schema";

@Controller('entities')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Entity[]> {
    return this.entitiesService.getAll();
  }
}
