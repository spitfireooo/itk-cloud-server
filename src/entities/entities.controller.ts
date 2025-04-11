import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { EntitiesService } from "./entities.service";
import { Entity } from "./schema/entity.schema";

@Controller('entity')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Entity[]> {
    return this.entitiesService.getAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') id: string): Promise<Entity> {
    return this.entitiesService.getOne(id)
  }
}
