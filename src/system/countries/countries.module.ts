import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country], 'colegiodb')],
  exports: [CountriesService],
  providers: [CountriesService],
  controllers: [CountriesController],
})
export class CountriesModule {
}
