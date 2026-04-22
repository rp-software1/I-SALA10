import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mesa, MesaDocument } from './mesa.schema';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { EstadoMesaDto } from './dto/estado-mesa.dto';


@Injectable()

export class MesasService {
    constructor(@InjectModel(Mesa.name) private mesaModel: Model<MesaDocument>) { }


    private transaccionValidas: Record<string, string[]> = {
        'disponible': ['ocupada', 'reservada', 'fuera_de_servicio'],
        'ocupada': ['disponible'],
        'reservada': ['ocupada', 'disponible'],
        'fuera_de_servicio': ['disponible']
    };

    async cambiarEstado(id: string, dto: EstadoMesaDto) {
        const mesa = await this.findOne(id);
        const estadoActual = mesa.estado;
        const permitidas = this.transaccionValidas[estadoActual] ?? [];

        if (!permitidas.includes(dto.estado)) {
            throw new BadRequestException(`Transición: ${estadoActual} -> ${dto.estado} no esta permitida` +
                `Transiciones validas desde : ${estadoActual} : ${permitidas.join(', ')}`
            );
        }

        return this.mesaModel.findByIdAndUpdate(id, { estado: dto.estado }, { new: true }).exec();
    }

    findAll(estado?: string) {
        const filtro = estado ? { estado } : {};
        return this.mesaModel.find(filtro).exec();
    }

    async findOne(id: string) {
        const mesa = await this.mesaModel.findById(id).exec();
        if (!mesa) throw new NotFoundException(`Mesa con ID ${id} no encontrada`);
        return mesa;
    }

    create(dto: CreateMesaDto) {
        return new this.mesaModel({ ...dto, estado: 'disponible' }).save();
    }

    async update(id: string, dto: any) {
        const { estado, ...datosPermitidos } = dto;
        const mesa = await this.mesaModel.findByIdAndUpdate(id, datosPermitidos, { new: true }).exec();
        if (!mesa) throw new NotFoundException(`Mesa con ID ${id} no encontrada`);
        return mesa;
    }

}
