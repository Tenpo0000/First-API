import { BooksService } from './books.service.js';
import { Controller, Get, Post, Body, Param} from '@nestjs/common';

@Controller('books')
export class BooksController {
  constructor(private readonly booksServices: BooksService){}

  @Post()
  async create(@Body('titulo') titulo: string, @Body('autor') autor: string, @Body('descricao') descricao?: string){
    return this.booksServices.create(titulo, autor, descricao)
  }

  @Get()
  async findAll(){
    return this.booksServices.findAll();
  }

  @Get('id/:id')
  async findId(@Param ('id') id: string){
    return this.booksServices.findID(id);
  }

  @Get('titulo/:titulo')
  async findTitulo(@Param('titulo') titulo: string){
    return this.booksServices.findTitulo(titulo);
  }

  @Get('autor/:autor')
  async findAutor(@Param('autor') autor: string){
    return this.booksServices.findAutor(autor);
  }

  @Get('createAt/:createAt')
  async findCreatAt(@Param('createAt') createAt: Date){
    return this.booksServices.findCreatedAdt(createAt);
  }

  @Get ('updateAt/:updateAt')
  async findUpdateAt(@Param('updateAt') updateAt: Date){
    return this.booksServices.findUpdateAt(updateAt);
  }

  @Get('update-After/:updateAfter')
  async findUpdateAfter(@Param('updateAfter') updateAfter: Date){
    return this.booksServices.findUpdateAfter(updateAfter);
  }

  @Get('update-between/:start/:end')
  async findBetween(@Param('start, end') start: Date, end: Date){
    return this.booksServices.findUpdateBetween(start, end);
  }
}
