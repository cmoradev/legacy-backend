import { Module } from '@nestjs/common';
import { InvoicesMethodsPaymentsModule } from './invoices-methods-payments/invoices-methods-payments.module';
import { InvoicesBankModule } from './invoices-bank/invoices-bank.module';
import { CountriesModule } from './countries/countries.module';
import { StatesModule } from './states/states.module';
import { CitiesModule } from './cities/cities.module';
import { MunicipalitiesModule } from './municipalities/municipalities.module';

@Module({
  imports: [
    InvoicesMethodsPaymentsModule,
    InvoicesBankModule,
    CountriesModule,
    StatesModule,
    CitiesModule,
    MunicipalitiesModule,
  ],
})
export class SystemModule {
}
