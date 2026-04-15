import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MesasController } from './mesas.controller';
import { MesasService } from './mesas.service';
import { Mesa, MesaSchema } from './mesa.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mesa.name, schema: MesaSchema }
    ])
  ],
  controllers: [MesasController],
  providers: [MesasService]
})
export class MesasModule { }
