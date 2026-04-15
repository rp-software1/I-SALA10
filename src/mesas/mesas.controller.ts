import { Controller, Get, Post, Body, Param, Patch, Query } from '@nestjs/common';
import { MesasService } from './mesas.service';

@Controller('api/mesas')
export class MesasController {
    constructor(private readonly mesasService: MesasService) { }



    @Patch(':id/estado')
    cambiarEstado(@Param('id') id: string, @Body() body: { estado: string }) {
        return this.mesasService.cambiarEstado(id, body.estado);
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
    create(@Body() dto: any) {
        return this.mesasService.create(dto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: any) {
        return this.mesasService.update(id, dto);
    }
}
