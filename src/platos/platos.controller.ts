import { Controller, Get } from '@nestjs/common';

@Controller('api/platos')
export class PlatosController {
    @Get()
    findAll() {
        return [
            { id: 1, nombre: "Lomo saltado", precio: 35, categoria: "Segundos" },
            { id: 2, nombre: "Ceviche", precio: 42, categoria: "Entradas" },

        ];
    }

}
