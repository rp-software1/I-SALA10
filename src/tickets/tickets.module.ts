import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Ticket, TicketSchema } from './ticket.schema';
import { MesasModule } from '../mesas/mesas.module';
import { PedidosModule } from '../pedidos/pedidos.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema }
    ]),
    PedidosModule,
    MesasModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketsModule { }
