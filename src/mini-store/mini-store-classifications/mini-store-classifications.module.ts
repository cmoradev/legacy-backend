import { Module } from '@nestjs/common';
import { MiniStoreClassificationsController } from './mini-store-classifications.controller';
import { MiniStoreClassificationsService } from './mini-store-classifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreClassification } from './entities/mini-store-classification.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([MiniStoreClassification], ColegioDBNameConnection) ],
  exports: [ MiniStoreClassificationsService ],
  controllers: [MiniStoreClassificationsController],
  providers: [MiniStoreClassificationsService],
})
export class MiniStoreClassificationsModule {}
