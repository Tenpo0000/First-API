import { IsString, IsOptional } from "class-validator";

export class CreateEditoras {
  @IsString()
  nome!:  string

  @IsString()
  cidade!:  string

  @IsString()
  pais!:  string

  @IsString()
  @IsOptional()
  CNPJ!:  string

  @IsString()
  @IsOptional()
  site!:  string
}