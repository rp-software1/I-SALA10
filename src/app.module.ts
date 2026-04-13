import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatosModule } from './platos/platos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        serverSelectionTimeoutMS: 20000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 20000,
      }),
    }),
    PlatosModule,
  ],
})
export class AppModule { }