import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { LoginDto } from "./login.dto";

export class RegisterDto extends LoginDto {
    @IsString()
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    name: string;
}