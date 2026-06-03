import { Module } from '@nestjs/common';
import { BooksModule } from './modules/books/books.module.js';
import { CategoriaModule } from './categoria/categoria.module';
import { AutorModule } from './autor/autor.module';
import { EditoraModule } from './editora/editora.module';
import { CategoriasController } from './modules/categorias/categorias.controller';
import { AutoresController } from './modules/autores/autores.controller';
import { EditorasController } from './modules/editoras/editoras.controller';
import { AutoresModule } from './modules/autores/autores.module';
import { EditorasModule } from './modules/editoras/editoras.module';
import { CategoriasModule } from './modules/categorias/categorias.module';

@Module({ 
  imports: [BooksModule, CategoriaModule, AutorModule, EditoraModule, AutoresModule, EditorasModule, CategoriasModule], controllers: [CategoriasController, AutoresController, EditorasController],
})
export class AppModule {}
