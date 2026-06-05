import { IsString, IsOptional } from "class-validator";

export class UpdateEditoras {
  @IsString()
  @IsOptional()
  nome!:  string

  @IsString()
  @IsOptional()
  cidade!:  string

  @IsString()
  @IsOptional()
  pais!:  string

  @IsString()
  @IsOptional()
  CNPJ!:  string

  @IsString()
  @IsOptional()
  site!:  string
}