import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pedido, PedidoSchema } from './pedido.schema';
import { MesasModule } from 'src/mesas/mesas.module';
import { PlatosModule } from 'src/platos/platos.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pedido.name, schema: PedidoSchema }
    ]),
    MesasModule,// ← NUEVO — da acceso a MesasService
    PlatosModule,

  ],
  controllers: [PedidosController],
  providers: [PedidosService]
})
export class PedidosModule { }
