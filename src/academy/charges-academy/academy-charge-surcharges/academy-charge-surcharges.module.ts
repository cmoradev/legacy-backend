import { Module } from '@nestjs/common';
import { AcademyChargeSurchargesService } from './academy-charge-surcharges.service';
import { AcademyChargeSurchargesController } from './academy-charge-surcharges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { AcademyChargeSurcharges } from './entities/academy-charge-surcharges.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademyChargeSurcharges], ColegioDBNameConnection)],
  providers: [AcademyChargeSurchargesService],
  controllers: [AcademyChargeSurchargesController],
})
export class AcademyChargeSurchargesModule {
}
