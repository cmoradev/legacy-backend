import { Module } from '@nestjs/common';
import { InvoicesMethodsPaymentsModule } from './invoices-methods-payments/invoices-methods-payments.module';
import { InvoicesBankModule } from './invoices-bank/invoices-bank.module';
import { CountriesModule } from './countries/countries.module';
import { StatesModule } from './states/states.module';
import { CitiesModule } from './cities/cities.module';
import { MunicipalitiesModule } from './municipalities/municipalities.module';
import { SystemDashBoardModule } from './system-dash-board/system-dash-board.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PermissionsModule } from '../system/permissions/permissions.module';
import { RolesModule } from '../system/roles/roles.module';
import { RoutesModule } from '../system/routes/routes.module';
import { DepartmentsModule } from '../system/departments/departments.module';
import { TaxModule } from './tax/tax.module';
import { PaymentStatusModule } from './payment-status/payment-status.module';
@Module({
  imports: [
    PermissionsModule,
    RolesModule,
    RoutesModule,
    InvoicesMethodsPaymentsModule,
    InvoicesBankModule,
    CountriesModule,
    StatesModule,
    DepartmentsModule,
    CitiesModule,
    MunicipalitiesModule,
    SystemDashBoardModule,
    AuthModule,
    UsersModule,
    TaxModule,
    PaymentStatusModule,
  ],
})
export class SystemModule {
}
