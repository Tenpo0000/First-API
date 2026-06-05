import { Controller,Body, Get, Patch, Param, Query, Post, Delete } from '@nestjs/common';
import { EditorasService } from './editoras.service.js';
import { CreateEditoras } from './dtos/create-editoras.dto.js';
import { UpdateEditoras } from './dtos/update-editoras.dto.js';

@Controller('editoras')
export class EditorasController {
  constructor(private readonly editoraService: EditorasService){}

  @Post()
  async create(@Body() dto: CreateEditoras){
    return this.editoraService.create(dto);
  }

  @Delete('deleteByName/:nome')
  async deleteByName(@Param('nome') nome: string){
    return this.editoraService.deleteByName(nome);
  }

  @Delete('deleteById/:id')
  async deleteById(@Param('id') id: string){
    return this.editoraService.deleteById(id);
  }

  @Patch('updateByName/:nome')
  async updateByName(@Param('nome') nome: string, @Body() dto: UpdateEditoras){
    return this.editoraService.updateByName(nome, dto);
  }

  @Patch('updateById/:id')
  async updateById(@Param('id') id: string, @Body() dto: UpdateEditoras){
    return this.editoraService.updateById(id, dto);
  }

  @Get()
  async findAll(@Query('nome') nome?: string, @Query('id') id?: string){
    if(nome) {
      return this.editoraService.findByName(nome);  
    } else if(id) {
      return this.editoraService.findById(id);  
    }

    return this.editoraService.findAll();  
  }

  @Get('findCreatedOnDay/:data')
  async findCreatedOnDay(@Param('data')data: string){
    return this.editoraService.findCreatedOnDay(new Date(data));
  }

  @Get('findCreatedAfter/:data')
  async findCreatedAfter(@Param('data') data:string){
    return this.editoraService.findCreatedAfter(new Date(data));
  }

  @Get('findCreatedBefore/:data')
  async findCreatedBefore(@Param('data') data: string){
    return this.editoraService.findCreatedBefore(new Date(data));
  }

  @Get('findCreatedBetween/:start/:end')
  async findCreatedBetween(@Param('start') start: string,@Param('end') end: string){
    return this.editoraService.findCreatedBetween(new Date(start), new Date(end));
  }
  
  @Get('findUpdatedOnDay/:data')
  async findUpdatedOnDay(@Param('data') data: string){
    return this.editoraService.findUpdatedOnDay(new Date(data));
  }

  @Get('findUpdatedAfter/:data')
  async findUpdatedAfter(@Param('data') data:string){
    return this.editoraService.findUpdatedAfter(new Date(data));
  }

  @Get('findUpdatedBefore/:data')
  async findUpdatedBefore(@Param('data')data: string){
    return this.editoraService.findUpdatedBefore(new Date(data));
  }

  @Get('/findUpdatedBetween/:start/:end')
  async findUpdatedBetween(@Param('start') start: string,@Param('end') end: string){
    return this.editoraService.findUpdatedBetween(new Date(start), new Date(end));
  }
}
