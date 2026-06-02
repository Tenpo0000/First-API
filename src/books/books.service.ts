import { Injectable } from '@nestjs/common';
import { prisma } from '../lib/prisma.js';

@Injectable()
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

  async findCreatedAdt(createdAdt: Date){
    return prisma.books.findMany({
      where: {createdAdt},
    });
  }

  async findUpdateAt(updateAt: Date){
    return prisma.books.findMany({
      where: {
        updateAt: {
          equals: updateAt,
        },
      },
    });
  }

  async findUpdateAfter(date: Date) {
    return prisma.books.findMany({
      where: {
        updateAt:{
          gte: date,
        },
      },
    })
  }

  async  findUpdateBetween(start: Date, end: Date){
    return prisma.books.findMany({
      where: {
        updateAt: {
          gte: start,
          lte: end,
        },
      },
    });
  }
}