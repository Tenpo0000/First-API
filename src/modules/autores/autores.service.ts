import { Injectable, NotFoundException  } from '@nestjs/common';
import { CreateAutores } from './dtos/create-autores.dto.js';
import { UpdateAutores } from './dtos/update-autores.dto.js';
import { prisma } from '../../lib/prisma.js';
@Injectable()
export class AutoresService {
  // mensagens de erros:
  private throwNotFound() :never{
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
      where: {nome: nome}
    })

    if (!autor){
      this.throwNotFound()
    }

    return prisma.autor.delete({
      where:{ nome: nome }
    });
  }

  async deleteById(id: string){
    const autor = await prisma.autor.findUnique({
      where: {id: id}
    })

    if (!autor){
      this.throwNotFound()
    }

    return prisma.autor.delete({
      where:{ id: id }
    });
  }

  // Updates:
  async updateByName(nome: string, dto: UpdateAutores){
    const autor = await prisma.autor.findUnique({
      where: {nome: nome}
    })

    if (!autor){
      this.throwNotFound()
    }

    return prisma.autor.update({
      where:{ nome: nome },
      data:{...dto}
    });
  }

  async updateById(id: string, dto: UpdateAutores){
    const autor = await prisma.autor.findUnique({
      where: {id: id}
    });

    if (!autor){
      this.throwNotFound()
    }

    return prisma.autor.update({
      where: { id: id },
      data: {...dto}
    });
  }

  // Gets:
  async findAll(){
    return prisma.autor.findMany();
  }

  async findByName(nome: string){
    const autor = await prisma.autor.findUnique({
      where: {nome: nome}
    });

    if (!autor){
      this.throwNotFound()
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