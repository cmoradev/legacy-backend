import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country], ColegioDBNameConnection)],
  exports: [CountriesService],
  providers: [CountriesService],
  controllers: [CountriesController],
})
export class CountriesModule {
}
