import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Transaction } from './entities/transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([ Transaction ], ColegioDBNameConnection)],
  exports: [  TransactionService ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}