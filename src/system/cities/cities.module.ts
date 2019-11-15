import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cities } from './entities/cities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cities], 'colegiodb')],
  exports: [CitiesService],
  providers: [CitiesService],
  controllers: [CitiesController],
})
export class CitiesModule {
}
