import { IsOptional, IsString } from "class-validator";

export class CreateCategoriaDto {
    @IsString()
    nome!: string;

    @IsString()
    @IsOptional()
    titulo!: string;
}