import { Module } from '@nestjs/common';
import { PlatosModule } from './platos/platos.module';
@Module({
  imports: [PlatosModule]
})
export class AppModule { }
