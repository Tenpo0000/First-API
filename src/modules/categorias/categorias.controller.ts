import { Controller, Get, Put, Patch, Delete, Body, Param, Post, Query} from '@nestjs/common';
import { CategoriasService } from './categorias.service.js';
import { CreateCategoriaDto } from './dtos/create-categorias.dto.js';
import { UpdateCategoriaDto } from './dtos/update-categorias.dto.js';
import { ValidationBookDto } from './dtos/validation-book.dto.js';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly CategoriaService: CategoriasService){}

  @Post()
  async create(@Body() dto: CreateCategoriaDto){
    return this.CategoriaService.create(dto);
  }

  @Post(':nome/adicionarLivro/')
  async addBookCategory(@Body() dto: ValidationBookDto, @Param('nome') categoriaNome: string){
    return this.CategoriaService.addBookCategory(dto,categoriaNome);
  }
  
  @Patch(':nome/removerLivro/')
  async deleteBookCategory(@Param() dto: ValidationBookDto,categoriaNome: string ){
    return this.CategoriaService.deleteBookCategory(dto,categoriaNome);
  }

  @Patch(':nome')
  async updateByName(@Param('nome') nomeAntigo: string, @Body() dto: UpdateCategoriaDto){
    return this.CategoriaService.updateByName(nomeAntigo, dto);
  }

  @Patch(':id')
  async updateById(@Param('id') id: string, @Body() dto: UpdateCategoriaDto){
    return this.CategoriaService.updateById(id, dto);
  } 
  @Delete(':nome')
  async deleteByName(@Param('nome') nome: string) {
    return this.CategoriaService.deleteByName(nome);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return  this.CategoriaService.deleteById(id);
  }

  @Get()
  async findAll(){
    return this.CategoriaService.findAll();
  }

  @Get(':id')
  async findId(@Param('id')id: string){ 
    return this.CategoriaService.findId(id);
  }

  @Get(':nome')
  async findName(@Param('nome') nome: string){
    return this.CategoriaService.findName(nome);
  }

  @Get('/findCreatedAt/:date')
  async findCreatedAt(@Param('date') createdAt: Date){
    return this.CategoriaService.findCreatedAt(createdAt);
  }
  
  @Get('/findUpdateAt/:date')
  async findUpdateAt(@Param('date') updateAt: Date){
    return this.CategoriaService.findUpdateAt(updateAt);
  }

  @Get('/findUpdatedAfter/:date')
  async findUpdatedAfter(@Param('date') updateAt: Date){
    return this.CategoriaService.findUpdatedAfter(updateAt);
  }

  @Get('/findUpdatedBetween/')
  async findUpdatedBetween(@Query('start') start: Date, @Query('end') end: Date){
    return this.CategoriaService.findUpdatedBetween(start, end);
  }
}