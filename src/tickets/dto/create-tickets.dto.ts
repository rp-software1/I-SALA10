import { IsMongoId, IsIn } from "class-validator";

export class CreateTicketDto {
    @IsMongoId()
    pedidoId: string;

    @IsIn(["efectivo", "tarjeta", "yape"])
    metodoPago: string;
}