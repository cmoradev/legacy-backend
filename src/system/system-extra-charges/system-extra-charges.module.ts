import { Module } from '@nestjs/common';
import { SystemExtraChargesService } from './system-extra-charges.service';
import { SystemExtraChargesController } from './system-extra-charges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemExtraCharges } from './entities/system-extra-charges.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([SystemExtraCharges], ColegioDBNameConnection)],
  providers: [SystemExtraChargesService],
  controllers: [SystemExtraChargesController],
})
export class SystemExtraChargesModule {
}
