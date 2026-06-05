import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../../lib/prisma.js';
import { CreateEditoras } from './dtos/create-editoras.dto.js';
import { UpdateEditoras } from './dtos/update-editoras.dto.js';
import { throwError } from 'rxjs';

@Injectable()
export class EditorasService {
  // mensagens de erros:
  private throwNotFoundEditora() :never{
    throw new NotFoundException(`A editora com as credenciais informadas não foi encontrada!`)
  }

  // Creates:
  async create(dto: CreateEditoras){ 
    return prisma.editora.create({
      data:{...dto}
    })
  }

  // Deletes:
  async deleteByName(nome: string){
    const editora = await prisma.editora.findUnique({
      where:{nome}
    })

    if(!editora){
      this.throwNotFoundEditora()
    }

    return prisma.editora.delete({
      where:{nome}
    })
  }

  async deleteById(id: string){
    const editora = await prisma.editora.findUnique({
      where:{id}
    })

    if(!editora){
      this.throwNotFoundEditora()
    }

    return prisma.editora.delete({
      where:{id}
    })
  }

  // Updates:
  async updateByName(nome: string, dto: UpdateEditoras){
    const editora = await prisma.editora.findUnique({
      where:{nome}
    })

    if(!editora){
      this.throwNotFoundEditora()
    }

    return prisma.editora.update({
      where:{nome},
      data:{...dto}
    })
  }

  async updateById(id: string, dto: UpdateEditoras){
    const editora = await prisma.editora.findUnique({
      where:{id}
    })

    if(!editora){
      this.throwNotFoundEditora()
    }

    return prisma.editora.update({
      where:{id},
      data:{...dto}
    })
  }

  // Gets:
  async findAll(){
    return prisma.editora.findMany()
  }

  async findByName(nome: string){
    const editora = await prisma.editora.findUnique({
      where:{nome}
    })

    if(!editora) {
      this.throwNotFoundEditora()
    }

    return editora
  }

  async findById(id: string){
    const editora = await prisma.editora.findUnique({
      where:{id}
    })

    if(!editora){
      this.throwNotFoundEditora()
    }

    return editora
  }

  async findCreatedOnDay(data: Date){
    const start = new Date(data)
    start.setHours(0,0,0,0)

    const end = new Date(data)
    end.setHours(23,59,59,999)

    return prisma.editora.findMany({
      where:{
        createdAt:{
          gte: start,
          lte: end
        }
      }
    })
  }

  async findCreatedAfter(data:Date){
    const start = new Date(data)
    start.setHours(0,0,0,0)

    return prisma.editora.findMany({
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

    return prisma.editora.findMany({
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

    return prisma.editora.findMany({
      where:{
        createdAt:{
          gte: start,
          lte: end
        }
      }
    })
  }

  async findUpdatedOnDay(data:Date){
    const start = new Date(data)
    start.setHours(0,0,0,0)
    
    const end = new Date(data)
    end.setHours(23,59,59,999)

    return prisma.editora.findMany({
      where:{
        updatedAt:{
          gte: start,
          lte: end
        }
      }
    })
  }

  async findUpdatedAfter(data:Date){
    const start = new Date(data)
    start.setHours(0,0,0,0)

    return prisma.editora.findMany({
      where:{
        updatedAt:{
          gte:start
        }
      }
    })
  }

  async findUpdatedBefore(data: Date){
    const end = new Date(data)
    end.setHours(0,0,0,0)

    return prisma.editora.findMany({
      where:{
        updatedAt:{
          lte: end
        }
      }
    })
  }

  async findUpdatedBetween(start: Date, end: Date){
    start.setHours (0,0,0,0)
    end.setHours(23,59,59,999)

    return prisma.editora.findMany({
      where:{
        updatedAt:{
          gte: start,
          lte: end
        }
      }
    })
  }
}
