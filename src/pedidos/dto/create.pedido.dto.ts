import { IsString, IsOptional, IsMongoId, IsIn } from "class-validator";

export class CreatePedidoDto {

    @IsString()
    @IsOptional()
    @IsMongoId()
    mesaId?: string;

    @IsIn(["mesa", "para_llevar"])
    tipo: string

    @IsString()
    @IsOptional()
    @IsIn(["pendiente", "en_preparacion", "lista", "entregada", "cancelada", "cerrada"])
    estadoPedido?: string;

}

