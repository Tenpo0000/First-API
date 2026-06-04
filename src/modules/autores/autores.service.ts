import { Injectable, NotFoundException  } from '@nestjs/common';
import { CreateAutores } from './dtos/create-autores.dto.js';
import { UpdateAutores } from './dtos/update-autores.dto.js';
import { prisma } from '../../lib/prisma.js';
@Injectable()
export class AutoresService {

  private throwNotFound() :never{
    throw new NotFoundException("o Autor com as credenciais informadas não foi encontrado!");
  }

  async create(dto: CreateAutores){
    return prisma.autor.create({
      data:{...dto}
    });
  }

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

  async findCreatedOnDay(date: Date){
    const start = new Date(date);
    start.setHours(0,0,0,0);

    const end = new Date(date);
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

  async findUpdateOnDay(date: Date){
    const start = new Date(date);
    start.setHours(0,0,0,0);

    const end = new Date(date);
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
  
  async findUpdatedAfter(UpdatedAfter: Date){
    return prisma.autor.findMany({
      where:{
        updatedAt:{ gte: UpdatedAfter }
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

//futuramente fazer:
//criar um interceptor global para capturar e formatar erros de forma uniforme em toda a API para evitar duplicação de mensagens.
