import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../../lib/prisma.js';
import { CreateCategoriaDto } from './dtos/create-categorias.dto.js';
import { UpdateCategoriaDto} from './dtos/update-categorias.dto.js';
import { ValidationBookDto } from './dtos/validation-book.dto.js';
@Injectable()
export class CategoriasService {
  // mensagens de erros:
  private throwNotFoundCategoria() :never{
    throw new NotFoundException(`A categoria com as credenciais informadas não foi encontrada!`)
  }

  private throwNotFoundLivro():never{
    throw new NotFoundException(`O livro com as credenciais informadas não foi encontrado!`)
  }

  // Creates:
  async create(dto: CreateCategoriaDto) {
    return prisma.categoria.create({
      data: {...dto}
    });
  }
  
  // Deletes:
  async deleteByName(nome: string) {
    const categoriaNome = await prisma.categoria.findUnique({
      where:{nome: nome}
    })

    if(!categoriaNome){
      this.throwNotFoundCategoria();
    }
    
    return prisma.categoria.delete({
      where: {nome: nome}
    });
  }
  
  async deleteById(id: string) {
    const categoriaId = await prisma.categoria.findUnique({
      where:{id: id}
    })

    if(!categoriaId){
      this.throwNotFoundCategoria();
    }
    return prisma.categoria.delete({
      where: {id}
    });
  }

  // Updates:
  async updateByName(nomeAntigo: string, dto: UpdateCategoriaDto){
    const categoriaNome = await prisma.categoria.findUnique({
      where:{nome: nomeAntigo}
    })
    
    if(!categoriaNome){
      this.throwNotFoundCategoria();
    }
    
    return prisma.categoria.update({
      where:{nome: nomeAntigo},
      data:{...dto}
    });
  }

  async updateById(id: string, dto: UpdateCategoriaDto){
    const categoriaId = await prisma.categoria.findUnique({
      where:{id: id}
    })
    
    if(!categoriaId){
      this.throwNotFoundCategoria();
    }
    
    return prisma.categoria.update({
      where:{id},
      data:{...dto}
    });
  }
  
  async addBookCategory(dto: ValidationBookDto, categoriaNome: string){
    const livro = await prisma.books.findFirst({
      where:{titulo: dto.titulo}
    });
    
    if (!livro){
      this.throwNotFoundLivro();
    }

    const categoria = await prisma.categoria.findFirst({
      where: {nome: categoriaNome}
    });

    if (!categoria) {
      this.throwNotFoundCategoria();
    }

    return prisma.categoria.update({
      where:{nome: categoriaNome},
      data:{livroIds:{ push: livro.id}
      }
    });
  }

  async deleteBookCategory(dto: ValidationBookDto, categoriaNome: string){
    const livro = await prisma.books.findFirst({
      where: {titulo: dto.titulo}
    });
    
    if(!livro){
      this.throwNotFoundLivro();
    }
    
    const categoria = await prisma.categoria.findFirst({
      where: {nome: categoriaNome}
    });
    
    if (!categoria) {
      this.throwNotFoundCategoria();
    }

    const novosLivros = categoria.livroIds.filter(id => id !== livro.id);

    return prisma.categoria.update({
      where:{nome: categoriaNome},
      data:{livroIds: novosLivros}
    });
  }

  // Gets:
  async findAll(){
    return prisma.categoria.findMany();
  }

  async findById(id: string){
    const categoriaId = await prisma.categoria.findUnique({
      where:{id: id}
    })

    if(!categoriaId){
      this.throwNotFoundCategoria();
    }

    return categoriaId
  }

  async findByName(nome: string){
    const categoriaNome = await prisma.categoria.findUnique({
      where:{nome: nome}
    })

    if(!categoriaNome){
      this.throwNotFoundCategoria();
    }

    return categoriaNome
  }

  async findCreatedOnDay(date: Date){
    const start = new Date(date)
    start.setHours(0,0,0,0)

    const end = new Date(date)
    end.setHours(23,59,59,999)

     return prisma.categoria.findMany({
      where: {
        createdAt:{
          gte: start,
          lte: end
        }
      },
     });
  }

  async findUpdatedOnDay(date: Date){
    const start = new Date(date)
    start.setHours(0,0,0,0)

    const end = new Date(date)
    end.setHours(23,59,59,999)

    return prisma.categoria.findMany({
      where:{
        updatedAt: {
          gte:start,
          lte:end
        }
      }
    });
  }

  async findUpdatedAfter(date: Date){
    return prisma.categoria.findMany({
      where:{
        updatedAt:{gte: date},
      }
    });
  }

  async findUpdatedBefore(date: Date){
    return prisma.categoria.findMany({
      where:{
        updatedAt:{lte: date},
      }
    });
  }

  async findUpdatedBetween(start: Date, end: Date){
    return prisma.categoria.findMany({
        where:{
          updatedAt:{
            gte: start,
            lte: end
          }
        }
    });
  }
}