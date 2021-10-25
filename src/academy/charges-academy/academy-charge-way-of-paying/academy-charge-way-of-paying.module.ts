import { Module } from '@nestjs/common';
import { AcademyChargeWayOfPayingService } from './academy-charge-way-of-paying.service';
import { AcademyChargeWayOfPayingController } from './academy-charge-way-of-paying.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { AcademyChargeWayOfPaying } from './entities/academy-charge-way-of-paying.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademyChargeWayOfPaying], ColegioDBNameConnection)],
  providers: [AcademyChargeWayOfPayingService],
  controllers: [AcademyChargeWayOfPayingController],
})
export class AcademyChargeWayOfPayingModule {
}
