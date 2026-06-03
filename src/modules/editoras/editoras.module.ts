import { Module } from '@nestjs/common';
import { EditorasController } from './editoras.controller.js';
import { EditorasService } from './editoras.service.js';

@Module({
  controllers: [EditorasController],
  providers: [EditorasService]
})
export class EditorasModule {}
