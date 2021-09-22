import { Module } from '@nestjs/common';
import { SchoolChargesDetailsService } from './school-charges-details.service';
import { SchoolChargesDetailsController } from './school-charges-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolCharge } from '../school-charges/entities/school-charge.entity';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { SchoolChargeDetails } from './entities/school-charge-details.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SchoolChargeDetails], ColegioDBNameConnection)],
    providers: [SchoolChargesDetailsService],
    controllers: [SchoolChargesDetailsController],
})
export class SchoolChargesDetailsModule {
}
