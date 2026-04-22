import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pedido, PedidoDocument } from './pedido.schema';
import { MesasService } from 'src/mesas/mesas.service';
import { PlatosService } from 'src/platos/platos.service';
import { AddItemDto } from './dto/add.item.dto';
import { CreatePedidoDto } from './dto/create.pedido.dto';

@Injectable()
export class PedidosService {
    constructor(
        @InjectModel(Pedido.name) private pedidoModel: Model<PedidoDocument>,
        private readonly mesasService: MesasService,
        private readonly platosService: PlatosService
    ) { }

    private transaccionValidas: Record<string, string[]> = {
        'pendiente': ['en_preparacion', 'cancelada'],
        'en_preparacion': ['lista', 'cancelada'],
        'lista': ['entregada', 'cancelada'],
        'entregada': [],
        'cancelada': [],
        'cerrada': []
    };

    async cambiarEstado(id: string, nuevoEstado: string) {
        const pedido = await this.findOne(id);
        const permitidas = this.transaccionValidas[pedido.estadoPedido] ?? [];

        if (!permitidas.includes(nuevoEstado)) {
            throw new BadRequestException(
                `Transición: ${pedido.estadoPedido} -> ${nuevoEstado} no esta permitida`
            );
        }

        return this.pedidoModel.findByIdAndUpdate(
            id,
            { estadoPedido: nuevoEstado },
            { new: true }
        ).exec();
    }

    findAll(estadoPedido?: string) {
        const filtro = estadoPedido ? { estadoPedido } : {};
        return this.pedidoModel.find(filtro).exec();
    }

    async findOne(id: string) {
        const pedido = await this.pedidoModel.findById(id).exec();
        if (!pedido) {
            throw new NotFoundException(`Pedido ${id} no encontrado`);
        }
        return pedido;
    }

    async create(dto: CreatePedidoDto) {
        const pedido = await new this.pedidoModel({
            mesaId: dto.mesaId ?? null,
            tipoPedido: dto.tipo,
            estadoPedido: dto.estadoPedido ?? 'pendiente',
            items: [],
            total: 0
        }).save();

        if (dto.mesaId) {
            await this.mesasService.cambiarEstado(dto.mesaId, { estado: 'ocupada' });
            await this.mesasService.update(dto.mesaId, { pedidoActivoId: pedido._id.toString() });
        }

        return pedido;
    }

    async addItem(pedidoId: string, dto: AddItemDto) {
        const pedido = await this.pedidoModel.findById(pedidoId).exec();

        if (!pedido) {
            throw new NotFoundException(`Pedido ${pedidoId} no encontrado`);
        }

        if (pedido.estadoPedido !== 'pendiente') {
            throw new BadRequestException('Solo se pueden agregar items a pedidos pendientes');
        }

        const plato = await this.platosService.findOne(dto.platoId);

        pedido.items.push({
            platoId: dto.platoId,
            nombre: plato.nombre,
            cantidad: dto.cantidad,
            precioUnitario: plato.precio
        } as any);

        pedido.total = pedido.items.reduce(
            (sum, item) => sum + item.cantidad * item.precioUnitario,
            0
        );

        pedido.markModified('items');
        return pedido.save();
    }
}