import { Controller, Get, Post, Body, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { MesasService } from './mesas.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { EstadoMesaDto } from './dto/estado-mesa.dto';

@Controller('api/mesas')
export class MesasController {
    constructor(private readonly mesasService: MesasService) { }



    @Patch(':id/estado')
    @UseGuards(JwtAuthGuard)
    cambiarEstado(@Param('id') id: string, @Body() dto: EstadoMesaDto) {
        return this.mesasService.cambiarEstado(id, dto);
    }

    @Get()
    findAll(@Query('estado') estado?: string) {
        return this.mesasService.findAll(estado);
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.mesasService.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() dto: CreateMesaDto) {
        return this.mesasService.create(dto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: any) {
        return this.mesasService.update(id, dto);
    }
}
