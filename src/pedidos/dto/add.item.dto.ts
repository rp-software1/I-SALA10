import { IsString, IsMongoId, IsInt, Min, IsOptional } from "class-validator";

export class AddItemDto {

    @IsString()
    @IsMongoId()
    platoId: string;

    @IsInt({ message: 'La cantidad debe ser un número entero' })
    @Min(1, { message: 'La cantidad debe ser mayor a 1' })
    cantidad: number;

}