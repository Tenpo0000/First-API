import { IsOptional, IsString } from "class-validator"; 

export class CreateAutores{
  @IsString()
  nome!: string

  @IsString()
  @IsOptional()
  nacionalidade!: string;

  @IsString()
  @IsOptional()
  bio!: string;

  @IsString()
  @IsOptional()
  email!: string;
}