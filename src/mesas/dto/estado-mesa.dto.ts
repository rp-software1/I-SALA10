import { IsString, IsIn } from "class-validator";

export class EstadoMesaDto {

    @IsString()
    @IsIn(['disponible', 'ocupada', 'reservada'], { message: 'Estado no valido' })
    estado: string;

}