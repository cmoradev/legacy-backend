import { Module } from '@nestjs/common';
import { StatesService } from './states.service';
import { StatesController } from './states.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { States } from './entities/states.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([States], ColegioDBNameConnection)],
  exports: [StatesService],
  providers: [StatesService],
  controllers: [StatesController],
})
export class StatesModule {
}
