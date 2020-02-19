import { Module } from '@nestjs/common';
import { SchoolChargesController } from './school-charges.controller';
import { SchoolChargesService } from './school-charges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolCharge } from './entities/school-charge.entity';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolCharge], ColegioDBNameConnection)],
    controllers: [SchoolChargesController],
    providers: [SchoolChargesService],
})
export class SchoolChargesModule {
}
