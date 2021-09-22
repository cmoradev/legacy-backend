import { Module } from '@nestjs/common';
import { AcademyChargeDetailsService } from './academy-charge-details.service';
import { AcademyChargeDetailsController } from './academy-charge-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { AcademyChargeDetails } from './entities/academy-charge-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademyChargeDetails], ColegioDBNameConnection)],
  providers: [AcademyChargeDetailsService],
  controllers: [AcademyChargeDetailsController],
})
export class AcademyChargeDetailsModule {
}
