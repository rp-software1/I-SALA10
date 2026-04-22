import { IsInt, Min } from "class-validator";

export class CreateMesaDto {

    @IsInt()
    @Min(1, { message: 'El número de mesa debe ser mayor o igual a 1' })
    numero: number;

    @IsInt()
    @Min(1, { message: 'La capacidad debe ser mayor o igual a 1' })
    capacidad: number;

}