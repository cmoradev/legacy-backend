import { Module } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { PeriodsController } from './periods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentPlan } from '../payment-plans/entities/payment-plan.entity';
import { Periods } from './entities/periods.entity';
import { Connection } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([Periods], ColegioDBNameConnection)],
    providers: [PeriodsService],
    controllers: [PeriodsController],
})
export class PeriodsModule {
}
