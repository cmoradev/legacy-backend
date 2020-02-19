import { Module } from '@nestjs/common';
import { AcademyChargeModule } from './academy-charge/academy-charge.module';
import { AcademyChargeDetailsModule } from './academy-charge-details/academy-charge-details.module';
import { AcademyChargeDiscountsModule } from './academy-charge-discounts/academy-charge-discounts.module';
import { AcademyChargeSurchargesModule } from './academy-charge-surcharges/academy-charge-surcharges.module';
import { AcademyChargeWayOfPayingModule } from './academy-charge-way-of-paying/academy-charge-way-of-paying.module';
import { AcademyChargeInvoiceModule } from './academy-charge-invoice/academy-charge-invoice.module';

@Module({
    imports: [
        AcademyChargeModule,
        AcademyChargeDetailsModule,
        AcademyChargeDiscountsModule,
        AcademyChargeSurchargesModule,
        AcademyChargeWayOfPayingModule,
        AcademyChargeInvoiceModule,
    ],
})
export class ChargesAcademyModule {
}
