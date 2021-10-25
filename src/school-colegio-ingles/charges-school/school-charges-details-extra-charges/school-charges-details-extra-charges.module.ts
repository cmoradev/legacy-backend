import { Module } from '@nestjs/common';
import { SchoolChargesDetailsExtraChargesService } from './school-charges-details-extra-charges.service';
import { SchoolChargesDetailsExtraChargesController } from './school-charges-details-extra-charges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { SchoolChargesDetailsExtraCharges } from './entities/school-charges-details-extra-charges.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SchoolChargesDetailsExtraCharges], ColegioDBNameConnection)],
    providers: [SchoolChargesDetailsExtraChargesService],
    controllers: [SchoolChargesDetailsExtraChargesController],
})
export class SchoolChargesDetailsExtraChargesModule {
}
