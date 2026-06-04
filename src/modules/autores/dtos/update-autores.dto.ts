import { IsOptional, IsString } from "class-validator"; 

export class UpdateAutores{
  @IsString()
  @IsOptional()
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