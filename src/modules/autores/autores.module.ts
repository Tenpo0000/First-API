import { Module } from '@nestjs/common';
import { AutoresController } from './autores.controller.js';
import { AutoresService } from './autores.service.js';

@Module({
  controllers: [AutoresController],
  providers: [AutoresService]
})
export class AutoresModule {}
