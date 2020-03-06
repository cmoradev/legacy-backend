import { Module } from '@nestjs/common';
import { SystemTypeExtraChargesService } from './system-type-extra-charges.service';
import { SystemTypeExtraChargesController } from './system-type-extra-charges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemTypeExtraCharges } from './entities/system-type-extra-charges.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([SystemTypeExtraCharges], ColegioDBNameConnection)],
  providers: [SystemTypeExtraChargesService],
  controllers: [SystemTypeExtraChargesController],
})
export class SystemTypeExtraChargesModule {
}
