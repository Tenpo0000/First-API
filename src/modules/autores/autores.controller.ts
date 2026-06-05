import { Controller, Body, Get, Post, Patch, Delete, Param, Query  } from '@nestjs/common';
import { AutoresService } from './autores.service.js';
import { CreateAutores } from './dtos/create-autores.dto.js';
import { UpdateAutores } from './dtos/update-autores.dto.js';

@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Post()
  async create(@Body() dto: CreateAutores){
    return this.autoresService.create(dto)
  }

  @Delete('deleteByName/:nome')
  async deleteByName(@Param('nome') nome: string){
    return this.autoresService.deleteByName(nome)
   }

  @Delete('deleteById/:id')
  async deleteById(@Param('id') id: string){
    return this.autoresService.deleteById(id)
  }

  @Patch('updateByName/:nome')
  async updateByName(@Param('nome') nome: string, @Body() dto: UpdateAutores){
    return this.autoresService.updateByName(nome, dto)
  }

  @Patch('updateById/:id')
  async updateById(@Param('id') id: string, @Body() dto: UpdateAutores){
    return this.autoresService.updateById(id, dto)
  }

  @Get()
  async findAll(@Query('nome') nome?: string, @Query('id') id?: string){  
    if(nome){
      return this.autoresService.findByName(nome)
    } else if(id){
      return this.autoresService.findById(id)
    }
    return this.autoresService.findAll()
  }

  @Get('findCreatedOnDay/:data')
  async findCreatedOnDay(@Param('data') data: string){
    return this.autoresService.findCreatedOnDay(new Date(data))
  }

  @Get('findUpdatedOnDay/:data')
  async findUpdatedOnDay(@Param('data') data: string){
    return this.autoresService.findUpdatedOnDay(new Date(data))
  }

  @Get('findUpdatedAfter/:data')
  async findUpdatedAfter(@Param('data') data: string){
    return this.autoresService.findUpdatedAfter(new Date(data))
  }

  @Get('findUpdatedBefore/:data')
  async findUpdatedBefore(@Param('data') data: string){
    return this.autoresService.findUpdatedBefore(new Date(data))
  }

  @Get('findUpdatedBetween/:start/:end')
  async findUpdatedBetween(@Param('start') start: string,@Param('end') end: string){
    return this.autoresService.findUpdatedBetween(new Date(start), new Date(end))
  }
}