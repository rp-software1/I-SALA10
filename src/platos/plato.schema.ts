import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PlatoDocument = HydratedDocument<Plato>;

@Schema()
export class Plato {
    @Prop({ required: true })
    nombre: string;

    @Prop()
    descripcion: string;

    @Prop({ required: true })
    precio: number;

    @Prop({ required: true })
    categoria: string;

    @Prop({ default: true })
    disponible: boolean;
}

export const PlatoSchema = SchemaFactory.createForClass(Plato);


