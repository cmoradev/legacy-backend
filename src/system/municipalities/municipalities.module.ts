import { Module } from '@nestjs/common';
import { MunicipalitiesService } from './municipalities.service';
import { MunicipalitiesController } from './municipalities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipalities } from './entities/municipalities.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([Municipalities], ColegioDBNameConnection)],
  exports: [MunicipalitiesService],
  providers: [MunicipalitiesService],
  controllers: [MunicipalitiesController],
})
export class MunicipalitiesModule {
}
