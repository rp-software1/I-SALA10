import { Controller, Post, Body, Param, Patch, Get, Query } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('api/pedidos')
export class PedidosController {
    constructor(private readonly pedidosService: PedidosService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() dto: { mesaId?: string, tipoPedido: string }) {
        return this.pedidosService.create(dto);
    }

    @Post(':id/items')
    @UseGuards(JwtAuthGuard)
    addItem(@Param('id') id: string, @Body() body: { platoId: string, cantidad: number }) {
        return this.pedidosService.addItem(id, body);
    }

    @Patch(':id/estado')
    @UseGuards(JwtAuthGuard)
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
