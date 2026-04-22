import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { PlatosService } from './platos.service';
import { CreatePlatoDto } from './dto/create.plato.dto';

@Controller('api/platos')
export class PlatosController {
    constructor(private readonly platosService: PlatosService) { }
    @Get()
    findAll() {
        return this.platosService.findAll();// delegada el servicio
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.platosService.findOne(id);
    }

    @Post()
    create(@Body() createPlatoDto: CreatePlatoDto) {
        return this.platosService.create(createPlatoDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePlatoDto: any) {
        return this.platosService.update(id, updatePlatoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.platosService.remove(id);
    }

}
