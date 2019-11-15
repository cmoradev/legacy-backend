import { Module } from '@nestjs/common';
import { StatesService } from './states.service';
import { StatesController } from './states.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { States } from './entities/states.entity';

@Module({
  imports: [TypeOrmModule.forFeature([States], 'colegiodb')],
  exports: [StatesService],
  providers: [StatesService],
  controllers: [StatesController],
})
export class StatesModule {
}
