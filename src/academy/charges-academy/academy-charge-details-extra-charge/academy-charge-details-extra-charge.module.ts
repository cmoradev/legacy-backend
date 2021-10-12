import { Module } from '@nestjs/common';
import { AcademyChargeDetailsExtraChargeController } from './academy-charge-details-extra-charge.controller';
import { AcademyChargeDetailsExtraChargeService } from './academy-charge-details-extra-charge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { AcademyChargeDetailsExtraCharge } from './entities/academy-charge-details-extra-charge.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AcademyChargeDetailsExtraCharge], ColegioDBNameConnection)],
    controllers: [AcademyChargeDetailsExtraChargeController],
    providers: [AcademyChargeDetailsExtraChargeService],
})
export class AcademyChargeDetailsExtraChargeModule {
}
