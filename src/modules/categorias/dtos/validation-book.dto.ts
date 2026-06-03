import { IsOptional, IsString } from "class-validator";

export class ValidationBookDto {
  @IsString()
  titulo!: string;
}
