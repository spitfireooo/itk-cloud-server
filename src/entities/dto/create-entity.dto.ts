import { MaxLength, MinLength } from "class-validator";

export class CreateEntityDto {
  @MinLength(2, { message: 'Name must be more than 2 symbols' })
  @MaxLength(30, { message: 'Name must be less than 30 symbols' })
  readonly name: string;
}