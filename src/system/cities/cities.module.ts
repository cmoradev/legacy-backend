import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cities } from './entities/cities.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cities], ColegioDBNameConnection)],
  exports: [CitiesService],
  providers: [CitiesService],
  controllers: [CitiesController],
})
export class CitiesModule {
}
