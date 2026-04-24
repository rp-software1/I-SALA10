import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pedido, PedidoSchema } from './pedido.schema';
import { MesasModule } from '../mesas/mesas.module';
import { PlatosModule } from '../platos/platos.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pedido.name, schema: PedidoSchema }
    ]),
    MesasModule,// ← NUEVO — da acceso a MesasService
    PlatosModule,

  ],
  controllers: [PedidosController],
  providers: [PedidosService],
  exports: [PedidosService],
})
export class PedidosModule { }
