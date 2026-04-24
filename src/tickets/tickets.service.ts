import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket } from './ticket.schema';
import { CreateTicketDto } from './dto/create-tickets.dto';
import { PedidosService } from '../pedidos/pedidos.service';
import { MesasService } from '../mesas/mesas.service';

@Injectable()
export class TicketsService {
    constructor(@InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
        private readonly pedidosService: PedidosService, private readonly mesasService: MesasService) { }

    async create(dto: CreateTicketDto) {

        if (!dto.pedidoId) {
            throw new BadRequestException('pedidoId es requerido');
        }

        const pedido = await this.pedidosService.findOne(dto.pedidoId);

        if (!pedido) {
            throw new BadRequestException('Pedido no encontrado');
        }

        if (!pedido.items || !Array.isArray(pedido.items)) {
            throw new BadRequestException('El pedido no tiene items válidos');
        }

        if (pedido.estadoPedido !== "entregada") {
            throw new BadRequestException("El pedido no se puede pagar porque no esta entregado");
        }

        const itemSnapshot = pedido.items.map(item => ({
            nombre: item.nombre,
            cantidad: item.cantidad,
            precio: item.precioUnitario
        }));

        const total = itemSnapshot.reduce(
            (sum, item) => sum + item.cantidad * item.precio,
            0
        );

        const ticket = await new this.ticketModel({
            pedidoId: dto.pedidoId,
            mesaId: pedido.mesaId ?? null,
            items: itemSnapshot,
            subtotal: total,
            total,
            metodoPago: dto.metodoPago
        }).save();

        await this.pedidosService.cambiarEstado(dto.pedidoId, "cerrada");

        if (pedido.mesaId) {
            await this.mesasService.cambiarEstado(pedido.mesaId, { estado: "disponible" });
            await this.mesasService.update(pedido.mesaId, { pedidoActivoId: null });
        }

        return ticket;
    }

    async findOne(id: string) {
        const ticket = await this.ticketModel.findById(id).exec();
        if (!ticket) {
            throw new NotFoundException(`Ticket ${id} no encontrado`);
        }
        return ticket;
    }



}
