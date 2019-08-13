import { Module } from '@nestjs/common';
import { CampusesController } from './campuses.controller';
import { CampusesService } from './campuses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campus } from '../subjects/entities/campus.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Campus], 'colegiodb') ],
  exports: [ CampusesService ],
  controllers: [CampusesController],
  providers: [CampusesService],
})
export class CampusesModule {}
