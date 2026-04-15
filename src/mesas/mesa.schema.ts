import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MesaDocument = HydratedDocument<Mesa>;


export enum EstadoMesa {
    DISPONIBLE = 'disponible',
    OCUPADA = 'ocupada',
    RESERVADA = 'reservada',
    FUERA_DE_SERVICIO = 'fuera_de_servicio'
}

@Schema()
export class Mesa {
    @Prop({ required: true, unique: true })
    numero: number;

    @Prop({ required: true })
    capacidad: number;

    @Prop({ required: true, enum: EstadoMesa, default: EstadoMesa.DISPONIBLE })
    estado: string;

    @Prop({ default: null })
    pedidoActivoId: string;

}

export const MesaSchema = SchemaFactory.createForClass(Mesa);
