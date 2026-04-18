import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatosController } from './platos.controller';
import { PlatosService } from './platos.service';
import { Plato, PlatoSchema } from './plato.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Plato.name, schema: PlatoSchema }
    ])
  ],
  controllers: [PlatosController],
  providers: [PlatosService],
  exports: [PlatosService]
})
export class PlatosModule { }

