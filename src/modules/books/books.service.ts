import { Injectable } from '@nestjs/common';
import { prisma } from '../../lib/prisma.js';

@Injectable()

//Creates:
export class BooksService {
  async create (titulo: string, autor: string, descricao?: string){
    return prisma.books.create({
      data:{
        titulo,
        autor,
        descricao,
      },      
    });
  }
//


// Gets:
  async findAll(){
    return prisma.books.findMany();
  }

  async findID(id: string){
    return prisma.books.findUnique({
      where: {id},
    });
  }

  async findTitulo(titulo: string) {
    return prisma.books.findMany({
      where: {titulo},
    });
  }

  async findAutor(autor: string){
    return prisma.books.findMany({
      where: {autor},
      });
  }

  async findCreatedAdt(createdAt: Date){
    return prisma.books.findMany({
      where: {createdAt},
    });
  }

  async findUpdateAt(updatedAt: Date){
    return prisma.books.findMany({
      where: {
        updatedAt: {
          equals: updatedAt,
        },
      },
    });
  }

  async findUpdateAfter(date: Date) {
    return prisma.books.findMany({
      where: {
        updatedAt:{
          gte: date,
        },
      },
    })
  }

  async  findUpdateBetween(start: Date, end: Date){
    return prisma.books.findMany({
      where: {
        updatedAt: {
          gte: start,
          lte: end,
        },
      },
    });
  }
//
}