import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { RouterModule } from 'nest-router';
import { AcademyModule } from './academy/academy.module';
import { ConfigModule } from './common/config/config.module';
import { ColegioDBNameConnection, ColegioDBService } from './common/databases/colegiodb.service';
import { CreditNoteAcademyModule } from './credit-note-academy/credit-note-academy.module';
import { CreditNoteSchoolModule } from './credit-note-school/credit-note-school.module';
import { CreditNoteStoreModule } from './credit-note-store/credit-note-store.module';
import { FixedAssetsControlModule } from './fixed-assets-control/fixed-assets-control.module';
import { InvoiceModule } from './invoice/invoice.module';
import { MiniStoreModule } from './mini-store/mini-store.module';
import { routes } from './routes';
import { SchoolColegioInglesModule } from './school-colegio-ingles/school-colegio-ingles.module';
import { JwtGuard } from './system/auth/guards/jwt.guard';
import { SystemModule } from './system/system.module';
import { TransactionModule } from './system/transaction/transactions.module';
// @ts-ignore left join only
// tslint:disable-next-line:only-arrow-functions
TypeOrmCrudService.prototype.getJoinType = function (s: string) {
  // tslint:disable-next-line:no-console
  return 'leftJoin';
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: ColegioDBNameConnection,
      useClass: ColegioDBService,
    }),
    ScheduleModule.forRoot(),
    ConfigModule,
    RouterModule.forRoutes(routes),
    SchoolColegioInglesModule,
    MiniStoreModule,
    FixedAssetsControlModule,
    SystemModule,
    InvoiceModule,
    AcademyModule,
    CreditNoteAcademyModule,
    CreditNoteSchoolModule,
    CreditNoteStoreModule,
    TransactionModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {
  constructor() {
    RequestQueryBuilder.setOptions({
      delim: '$$',
    });
  }
}
