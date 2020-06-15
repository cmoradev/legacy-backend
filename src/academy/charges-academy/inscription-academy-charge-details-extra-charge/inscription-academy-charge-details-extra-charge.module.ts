import { Module } from '@nestjs/common';
import { InscriptionAcademyChargeDetailsExtraChargeController } from './inscription-academy-charge-details-extra-charge.controller';
import { IncriptionAcademyChargeDetailsExtraChargeService } from './inscription-academy-charge-details-extra-charge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { InscriptionAcademyChargeDetailsExtraChargeEntity } from './entites/inscription-academy-charge-details-extra-charge.entity';

@Module({
    imports: [TypeOrmModule.forFeature([InscriptionAcademyChargeDetailsExtraChargeEntity], ColegioDBNameConnection)],
    controllers: [InscriptionAcademyChargeDetailsExtraChargeController],
    providers: [IncriptionAcademyChargeDetailsExtraChargeService],
})
export class InscriptionAcademyChargeDetailsExtraChargeModule {
}
