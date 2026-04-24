import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TicketDocument = HydratedDocument<Ticket>;

@Schema({ timestamps: true })
export class Ticket {
    @Prop({ required: true })
    pedidoId: string;

    @Prop({ default: null })
    mesaId: string;

    @Prop({ type: [{ nombre: String, cantidad: Number, precioUnitario: Number }], default: [] })
    items: { nombre: string; cantidad: number; precioUnitario: number }[];

    @Prop({ default: 0 })
    subtotal: number;

    @Prop({ default: 0 })
    total: number;

    @Prop({ required: true, enum: ['Efectivo', 'Tarjeta', 'Yape'] })
    metodoPago: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);