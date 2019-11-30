import { Module } from '@nestjs/common';
import { SystemPaymentsStatusController } from './system-payments-status.controller';
import { SystemPaymentsStatusService } from './system-payments-status.service';
import { SystemPaymentStatus } from './entities/system-payment-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([SystemPaymentStatus], 'colegiodb')],
    exports: [SystemPaymentsStatusService],
    controllers: [SystemPaymentsStatusController],
    providers: [SystemPaymentsStatusService],
})
export class SystemPaymentsStatusModule {
}
