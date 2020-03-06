import { Module } from '@nestjs/common';
import { CampusesController } from './campuses.controller';
import { CampusesService } from './campuses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campus } from './entities/campus.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([Campus], ColegioDBNameConnection) ],
  exports: [ CampusesService ],
  controllers: [CampusesController],
  providers: [CampusesService],
})
export class CampusesModule {}
