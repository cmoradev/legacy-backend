import { Module } from '@nestjs/common';
import { SchoolPaymentsController } from './school-payments.controller';
import { SchoolPaymentsService } from './school-payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolPayment } from './entities/school-payment.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolPayment], ColegioDBNameConnection)],
  controllers: [SchoolPaymentsController],
  providers: [SchoolPaymentsService],
})
export class SchoolPaymentsModule {
}
