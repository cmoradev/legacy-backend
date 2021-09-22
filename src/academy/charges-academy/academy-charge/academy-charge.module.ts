import { Module } from '@nestjs/common';
import { AcademyChargeService } from './academy-charge.service';
import { AcademyChargeController } from './academy-charge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { AcademyCharge } from './entities/academy-charge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademyCharge], ColegioDBNameConnection)],
  providers: [AcademyChargeService],
  controllers: [AcademyChargeController],
})
export class AcademyChargeModule {
}
