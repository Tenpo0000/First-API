import { Module } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client.js';
import { BooksService } from './books.service.js';
import { BooksController } from './books.controller.js';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaClient]
})
export class BooksModule {}
