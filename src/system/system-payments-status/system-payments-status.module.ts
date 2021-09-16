import { Module } from '@nestjs/common';
import { SystemPaymentsStatusController } from './system-payments-status.controller';
import { SystemPaymentsStatusService } from './system-payments-status.service';
import { SystemPaymentStatus } from './entities/system-payment-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([SystemPaymentStatus], ColegioDBNameConnection)],
    exports: [SystemPaymentsStatusService],
    controllers: [SystemPaymentsStatusController],
    providers: [SystemPaymentsStatusService],
})
export class SystemPaymentsStatusModule {
}
