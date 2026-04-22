import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plato, PlatoDocument } from './plato.schema';
import { CreatePlatoDto } from './dto/create.plato.dto';

@Injectable()
export class PlatosService {
    constructor(
        @InjectModel(Plato.name) private platoModel: Model<PlatoDocument>
    ) { }

    findAll() {
        return this.platoModel.find().exec();
    }

    async findOne(id: string) {
        const plato = await this.platoModel.findById(id).exec();
        if (!plato) {
            throw new NotFoundException(`Plato con ID ${id} no encontrado`);
        }
        return plato;
    }

    create(createPlatoDto: CreatePlatoDto) {
        const plato = new this.platoModel(createPlatoDto);
        return plato.save();
    }

    async update(id: string, updatePlatoDto: any) {
        const plato = await this.platoModel.findByIdAndUpdate(id, updatePlatoDto, { new: true }).exec();
        if (!plato) {
            throw new NotFoundException(`Plato con ID ${id} no encontrado`);
        }
        return plato;
    }

    async remove(id: string) {
        const plato = await this.platoModel.findByIdAndDelete(id).exec();
        if (!plato) {
            throw new NotFoundException(`Plato con ID ${id} no encontrado`);
        }
        return { message: `Plato con ID ${id} eliminado` };
    }
}