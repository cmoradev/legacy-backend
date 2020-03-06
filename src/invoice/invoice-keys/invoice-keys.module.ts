import { Module } from '@nestjs/common';
import { InvoiceKeysService } from './invoice-keys.service';
import { InvoiceKeysController } from './invoice-keys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceKeys } from './entities/invoice-keys.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceKeys], ColegioDBNameConnection)],
  providers: [InvoiceKeysService],
  controllers: [InvoiceKeysController],
})
export class InvoiceKeysModule {
}
