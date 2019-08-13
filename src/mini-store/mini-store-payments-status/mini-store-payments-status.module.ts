import { Module } from '@nestjs/common';
import { MiniStorePaymentsStatusController } from './mini-store-payments-status.controller';
import { MiniStorePaymentsStatusService } from './mini-store-payments-status.service';
import { MiniStorePaymentStatus } from '../../school-colegio-ingles/subjects/entities/mini-store-payment-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([MiniStorePaymentStatus], 'colegiodb')],
    exports: [MiniStorePaymentsStatusService],
    controllers: [MiniStorePaymentsStatusController],
    providers: [MiniStorePaymentsStatusService],
})
export class MiniStorePaymentsStatusModule {
}
