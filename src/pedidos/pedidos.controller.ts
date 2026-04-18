import { Controller, Post, Body, Param, Patch, Get, Query } from '@nestjs/common';
import { PedidosService } from './pedidos.service';

@Controller('api/pedidos')
export class PedidosController {
    constructor(private readonly pedidosService: PedidosService) { }

    @Post()
    create(@Body() dto: { mesaId?: string, tipoPedido: string }) {
        return this.pedidosService.create(dto);
    }

    @Post(':id/items')
    addItem(@Param('id') id: string, @Body() body: { platoId: string, cantidad: number }) {
        return this.pedidosService.addItem(id, body);
    }

    @Patch(':id/estado')
    cambiarEstado(@Param('id') id: string, @Body() body: { estadoPedido: string }) {
        return this.pedidosService.cambiarEstado(id, body.estadoPedido);
    }

    @Get()
    findAll(@Query('estadoPedido') estadoPedido?: string) {
        return this.pedidosService.findAll(estadoPedido);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pedidosService.findOne(id);
    }
}
