import { Controller, Get, Put, Patch, Delete, Body, Param, Post, Query} from '@nestjs/common';
import { CategoriasService } from './categorias.service.js';
import { CreateCategoriaDto } from './dtos/create-categorias.dto.js';
import { UpdateCategoriaDto } from './dtos/update-categorias.dto.js';
import { ValidationBookDto } from './dtos/validation-book.dto.js';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriaService: CategoriasService){}

  @Post()
  async create(@Body() dto: CreateCategoriaDto){
    return this.categoriaService.create(dto);
  }

  @Post(':nome/adicionarLivro/')
  async addBookCategory(@Body() dto: ValidationBookDto, @Param('nome') categoriaNome: string){
    return this.categoriaService.addBookCategory(dto,categoriaNome);
  }
  
  @Patch(':nome/removerLivro/')
  async deleteBookCategory(@Body() dto: ValidationBookDto, @Param('nome') categoriaNome: string ){
    return this.categoriaService.deleteBookCategory(dto,categoriaNome);
  }

  @Patch('/updateByName/:nome')
  async updateByName(@Param('nome') nomeAntigo: string, @Body() dto: UpdateCategoriaDto){
    return this.categoriaService.updateByName(nomeAntigo, dto);
  }

  @Patch('/updateById/:id')
  async updateById(@Param('id') id: string, @Body() dto: UpdateCategoriaDto){
    return this.categoriaService.updateById(id, dto);
  } 
  @Delete('/deleteByName/:nome')
  async deleteByName(@Param('nome') nome: string) {
    return this.categoriaService.deleteByName(nome);
  }

  @Delete('/deleteById/:id')
  async deleteById(@Param('id') id: string) {
    return  this.categoriaService.deleteById(id);
  }

  @Get()
  async findAll(@Query('nome') nome?: string, @Query('id') id?: string){  
    if(nome){
      return this.categoriaService.findByName(nome)
    } else if(id){
      return this.categoriaService.findById(id)
    }
    return this.categoriaService.findAll()
  }

  @Get('/findCreatedOnDay/:data')
  async findCreatedOnDay(@Param('data') data: string){
    return this.categoriaService.findCreatedOnDay(new Date(data))
  }

  @Get('/findUpdatedOnDay/:data')
  async findUpdatedOnDay(@Param('data') data: string){
    return this.categoriaService.findUpdatedOnDay(new Date(data))
  }

  @Get('/findUpdatedAfter/:data')
  async findUpdatedAfter(@Param('data') data: string){
    return this.categoriaService.findUpdatedAfter(new Date(data))
  }

  @Get('/findUpdatedBefore/:data')
  async findUpdatedBefore(@Param('data') data: string){
    return this.categoriaService.findUpdatedBefore(new Date(data))
  }

  @Get('/findUpdatedBetween/:start/:end')
  async findUpdatedBetween(@Param('start') start: string,@Param('end') end: string){
    return this.categoriaService.findUpdatedBetween(new Date(start), new Date(end))
  }
}