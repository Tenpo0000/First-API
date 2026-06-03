import { Injectable } from '@nestjs/common';
import { prisma } from '../../lib/prisma.js';
import { CreateCategoriaDto } from './dtos/create-categorias.dto.js';
import { UpdateCategoriaDto} from './dtos/update-categorias.dto.js';
import { ValidationBookDto } from './dtos/validation-book.dto.js';
@Injectable()
export class CategoriasService {

// Creates:
  async create(dto: CreateCategoriaDto) {
    return prisma.categoria.create({
      data: {
        nome: dto.nome,
        titulo: dto.titulo
      },
    });
  }

  async addBookCategory(dto: ValidationBookDto, categoriaNome: string){
    const livro = await prisma.books.findFirst({
      where:{titulo: dto.titulo},
    });

    if (!livro){
      throw new Error(`Livro com título "${dto.titulo}" não foi encontrado!`);
    }

    const categoria = await prisma.categoria.findFirst({
      where: {nome: categoriaNome},
    });
    
    if (!categoria) {
      throw new Error(`Categoria "${categoriaNome}" não foi encontrada!`);
    }

    return prisma.categoria.update({
      where:{nome: categoriaNome},
      data:{
        livroIds:{ push: livro.id },
      }
    });
  }
//

// Deletes:
  async deleteByName(nome: string) {
    return prisma.categoria.delete({
      where: {nome: nome},
    });
  }

  async deleteById(id: string) {
    return prisma.categoria.delete({
      where: { id },
    });
  }
//

// Updates:
  async updateByName(nomeAntigo: string, dto: UpdateCategoriaDto){
    return prisma.categoria.update({
      where:{ 
        nome: nomeAntigo
      },
      data:{
        nome: dto.nome,
        titulo: dto.titulo,
      },
    });
  }

  async updateById(id: string, dto: UpdateCategoriaDto){
    return prisma.categoria.update({
      where:{
          id
      },
      data:{
        nome: dto.nome,
        titulo: dto.titulo,
      },
    });
  }

  async deleteBookCategory(dto: ValidationBookDto, categoriaNome: string){
    const livro = await prisma.books.findFirst({
      where: {titulo: dto.titulo},
    });
    
    if(!livro){
      throw new Error(`Livro com título "${dto.titulo}" não foi encontrado!`);
    }

    const categoria = await prisma.categoria.findFirst({
      where: {nome: categoriaNome},
    });
    
    if (!categoria) {
      throw new Error(`Categoria "${categoriaNome}" não foi encontrada!`);
    }


    const novosLivros = categoria.livroIds.filter(id => id !== livro.id);

    return prisma.categoria.update({
      where:{nome: categoriaNome},
      data:{
           livrosIds:{novosLivros},
      },
    });
  }
//


// Gets:
  async findAll(){
    return prisma.categoria.findMany();
  }

  async findId(id: string){
    return prisma.categoria.findUnique({
      where: {id},
    });
  }

  async findName(nome: string){
    return prisma.categoria.findMany({
      where: {nome},
    });
  }

  async findCreatedAt(createdAt: Date){
     return prisma.categoria.findMany({
      where: {createdAt},
     });
  }

  async findUpdateAt(updateAt: Date){
    return prisma.categoria.findMany({
      where:{
        updatedAt: { 
          equals: updateAt,
        },
      },
    });
  }

  async findUpdatedAfter(updateAt: Date){
    return prisma.categoria.findMany({
      where:{
        updatedAt:{
          gte: updateAt,
        },
      },
    });
  }

  async findUpdatedBetween(start: Date, end: Date){
    return prisma.categoria.findMany({
        where:{
          updatedAt:{
            gte: start,
            lte: end,
          },
        },
    });
  }
//
}
