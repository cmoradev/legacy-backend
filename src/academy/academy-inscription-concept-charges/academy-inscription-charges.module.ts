import { Module } from '@nestjs/common';
import { AcademyInscriptionChargesController } from './academy-inscription-charges.controller';
import { IncriptionAcademyChargeDetailsExtraChargeService } from './inscription-academy-charge-details-extra-charge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { AcademyInscriptionConceptCharges } from './entites/academy-inscription-concept-charges.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AcademyInscriptionConceptCharges], ColegioDBNameConnection)],
    controllers: [AcademyInscriptionChargesController],
    providers: [IncriptionAcademyChargeDetailsExtraChargeService],
})
export class AcademyInscriptionChargesModule {
}
