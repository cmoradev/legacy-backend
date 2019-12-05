import { Module } from '@nestjs/common';
import { SystemExtraChargesService } from './system-extra-charges.service';
import { SystemExtraChargesController } from './system-extra-charges.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemExtraCharges } from './entities/system-extra-charges.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemExtraCharges], 'colegiodb')],
  providers: [SystemExtraChargesService],
  controllers: [SystemExtraChargesController],
})
export class SystemExtraChargesModule {
}
