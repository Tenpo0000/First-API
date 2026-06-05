import { Injectable, NotFoundException  } from '@nestjs/common';
import { CreateAutores } from './dtos/create-autores.dto.js';
import { UpdateAutores } from './dtos/update-autores.dto.js';
import { prisma } from '../../lib/prisma.js';
@Injectable()
export class AutoresService {
  // mensagens de erros:
  private throwNotFoundAutor() :never{
    throw new NotFoundException("o Autor com as credenciais informadas não foi encontrado!");
  }

  // Creates:
  async create(dto: CreateAutores){
    return prisma.autor.create({
      data:{...dto}
    });
  }

  // Deletes:
  async deleteByName(nome: string){
    const autor = await prisma.autor.findUnique({
      where: {nome}
    })

    if (!autor){
      this.throwNotFoundAutor()
    }

    return prisma.autor.delete({
      where:{nome}
    });
  }

  async deleteById(id: string){
    const autor = await prisma.autor.findUnique({
      where: {id}
    })

    if (!autor){
      this.throwNotFoundAutor()
    }

    return prisma.autor.delete({
      where:{id}
    });
  }

  // Updates:
  async updateByName(nome: string, dto: UpdateAutores){
    const autor = await prisma.autor.findUnique({
      where: {nome}
    })

    if (!autor){
      this.throwNotFoundAutor()
    }

    return prisma.autor.update({
      where:{nome},
      data:{...dto}
    });
  }

  async updateById(id: string, dto: UpdateAutores){
    const autor = await prisma.autor.findUnique({
      where: {id}
    });

    if (!autor){
      this.throwNotFoundAutor()
    }

    return prisma.autor.update({
      where: {id},
      data: {...dto}
    });
  }

  // Gets:
  async findAll(){
    return prisma.autor.findMany();
  }

  async findById(id: string){
    const categoriaId = await prisma.autor.findUnique({
      where:{id}
    })

    if(!categoriaId){
      this.throwNotFoundAutor();
    }
  }

  async findByName(nome: string){
    const autor = await prisma.autor.findUnique({
      where: {nome}
    });

    if (!autor){
      this.throwNotFoundAutor()
    }

    return autor
  }

  async findCreatedOnDay(data: Date){
    const start = new Date(data);
    start.setHours(0,0,0,0);

    const end = new Date(data);
    end.setHours(23,59,59,999);

    return prisma.autor.findMany({
      where:{ 
          createdAt: {
          gte: start,
          lte: end
        }
      }
    });
  }

  async findCreatedAfter(data:Date){
    const start = new Date(data)
    start.setHours(0,0,0,0)

    return prisma.autor.findMany({
      where:{
        createdAt:{
          gte:start
        }
      }
    })
  }

  async findCreatedBefore(data: Date){
    const end = new Date(data)
    end.setHours(0,0,0,0)

    return prisma.autor.findMany({
      where:{
        createdAt:{
          lte: end
        }
      }
    })
  }

  async findCreatedBetween(start: Date, end: Date){
    start.setHours (0,0,0,0)
    end.setHours(23,59,59,999)

    return prisma.autor.findMany({
      where:{
        createdAt:{
          gte: start,
          lte: end
        }
      }
    })
  }

  async findUpdatedOnDay(data: Date){
    const start = new Date(data);
    start.setHours(0,0,0,0);

    const end = new Date(data);
    end.setHours(23,59,59,999);

    return prisma.autor.findMany({
      where:{
        updatedAt:{
          gte: start,
          lte: end
        }
      }
    });
  }
  
  async findUpdatedAfter(data: Date){
    return prisma.autor.findMany({
      where:{
        updatedAt:{ gte: data }
      }
    });
  }

  async findUpdatedBefore(data: Date){
    return prisma.autor.findMany({
      where:{
        updatedAt:{lte: data},
      }
    });
  }

  async findUpdatedBetween(start: Date, end: Date){
    return prisma.autor.findMany({
      where:{
        updatedAt:{
          gte: start,
          lte: end
        }
      }
    });
  }
}

// TODO: criar interceptor global para formatar erros uniformemente