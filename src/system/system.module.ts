import { Module } from '@nestjs/common';
import { InvoicesBankModule } from './invoices-bank/invoices-bank.module';
import { CountriesModule } from './countries/countries.module';
import { StatesModule } from './states/states.module';
import { CitiesModule } from './cities/cities.module';
import { MunicipalitiesModule } from './municipalities/municipalities.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PermissionsModule } from '../system/permissions/permissions.module';
import { RolesModule } from '../system/roles/roles.module';
import { RoutesModule } from '../system/routes/routes.module';
import { DepartmentsModule } from '../system/departments/departments.module';
import { TaxModule } from './tax/tax.module';
import { PaymentStatusModule } from './payment-status/payment-status.module';
import { SystemPaymentsStatusModule } from './system-payments-status/system-payments-status.module';
import { SystemConceptsTypeModule } from './system-concepts-type/system-concepts-type.module';
import { ShiftModule } from './shift/shift.module';
import { SystemExtraChargesModule } from './system-extra-charges/system-extra-charges.module';
import { SystemTypeExtraChargesModule } from './system-type-extra-charges/system-type-extra-charges.module';
import { InscriptionStatusModule } from './inscription-status/inscription-status.module';
import { StatsModule } from './stats/stats.module';
import { SettingsModule } from './settings/settings.module';
import { FoliosModule } from './folios/folios.module';
import { AuthAccessTokensModule } from './auth-access-tokens/auth-access-tokens.module';
import { BranchOfficeModule } from './branch-office/branch-office.module';
import { BranchOfficeSettingModule } from './branch-office-setting/branch-office-setting.module';
import { ActionsModule } from './actions/actions.module';
import { RouteActionModule } from './route-action/route-action.module';

@Module({
    imports: [
        PermissionsModule,
        ActionsModule,
        RolesModule,
        RoutesModule,
        InvoicesBankModule,
        CountriesModule,
        SystemPaymentsStatusModule,
        StatesModule,
        DepartmentsModule,
        BranchOfficeModule,
        BranchOfficeSettingModule,
        CitiesModule,
        MunicipalitiesModule,
        SystemConceptsTypeModule,
        AuthModule,
        UsersModule,
        TaxModule,
        PaymentStatusModule,
        ShiftModule,
        SystemExtraChargesModule,
        SystemTypeExtraChargesModule,
        InscriptionStatusModule,
        StatsModule,
        SettingsModule,
        FoliosModule,
        AuthAccessTokensModule,
        RouteActionModule,
    ],
})
export class SystemModule {
}
