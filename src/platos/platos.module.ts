import { Module } from '@nestjs/common';
import { PlatosController } from './platos.controller';

@Module({
  controllers: [PlatosController]
})
export class PlatosModule { }
