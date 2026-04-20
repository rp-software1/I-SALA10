import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Usuario, UsuarioDocument } from './auth.schema';



@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
        private readonly jwtService: JwtService
    ) { }

    async register(dto: { name: string, email: string, password: string }) {
        const existe = await this.usuarioModel.findOne({ email: dto.email });
        if (existe) throw new ConflictException('El email ya está registrado');

        const pHash = await bcrypt.hash(dto.password, 10);

        const usuario = await new this.usuarioModel({
            ...dto,
            passwordHash: pHash
        }).save();

        const { passwordHash, ...resultado } = usuario.toObject();

        return resultado;

    }

    async login(dto: { email: string, password: string }) {
        const usuario = await this.usuarioModel.findOne({ email: dto.email });
        if (!usuario) throw new UnauthorizedException('Credenciales inválidas');

        const esCorrecto = await bcrypt.compare(dto.password, usuario.passwordHash);
        if (!esCorrecto) throw new UnauthorizedException('Credenciales inválidas');

        const payload = { sub: usuario._id, email: usuario.email, name: usuario.name };

        return { accessToken: this.jwtService.sign(payload) };
    }
}
