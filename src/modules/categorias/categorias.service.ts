import { Injectable } from '@nestjs/common';
import { prisma } from '../../lib/prisma.js';
import { CreateCategoriaDto } from './dtos/create-categorias.dto.js';
import { UpdateCategoriaDto} from './dtos/update-categorias.dto.js';
import { error } from 'node:console';
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

  // adiciona o livro para o array de livroId procurando pelo titulo do livro.
  async addBookCategory(livroNome: string, categoriaNome: string){
    const livro = await prisma.books.findFirst({
      where:{titulo: livroNome},
    });

    if (!livro){
      throw new Error(`Livro com título "${livroNome}" não foi encontrado!`);
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
  async deletByName(nome: string) {
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
  async updateByName(nomeAntigo: string, nomeNovo: string){
    return prisma.categoria.update({
      where:{ 
        nome: nomeAntigo
      },
      data:{
        nome:nomeNovo   //Troca o nome da categoria informando o nome da categoria como referencia e o novo nome que será dado no lugar. 
      },
    });
  }

  async updateById(id: string, nomeNovo: string){
    return prisma.categoria.update({
      where:{
          id
      },
      data:{
        nome:nomeNovo,
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
