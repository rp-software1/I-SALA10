import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class ItemPedido {
    @Prop({ required: true })
    platoId: string;

    @Prop({ required: true })
    nombre: string;

    @Prop({ required: true })
    cantidad: number;

    @Prop({ required: true })
    precioUnitario: number;
}

export const ItemPedidoSchema = SchemaFactory.createForClass(ItemPedido);

export type PedidoDocument = HydratedDocument<Pedido>;

@Schema({ timestamps: true })
export class Pedido {

    @Prop({ default: null })
    mesaId: string;

    @Prop({ required: true, enum: ["mesa", "para_llevar"] })
    tipoPedido: string;

    @Prop({
        required: true, enum: ["pendiente", "en_preparacion", "lista", "entregada", "cancelada"],
        default: "pendiente"
    })
    estadoPedido: string;

    @Prop({ type: [ItemPedidoSchema], default: [] })
    items: ItemPedido[];

    @Prop({ default: 0 })
    total: number;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);