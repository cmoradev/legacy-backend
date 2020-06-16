import { Module } from '@nestjs/common';
import { AcademyInscriptionChargesController } from './academy-inscription-charges.controller';
import { IncriptionAcademyChargeDetailsExtraChargeService } from './inscription-academy-charge-details-extra-charge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { AcademyInscriptionChargesEntity } from './entites/academy-inscription-charges.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AcademyInscriptionChargesEntity], ColegioDBNameConnection)],
    controllers: [AcademyInscriptionChargesController],
    providers: [IncriptionAcademyChargeDetailsExtraChargeService],
})
export class AcademyInscriptionChargesModule {
}
