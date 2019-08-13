import { Module } from '@nestjs/common';
import { MiniStoreClassificationsController } from './mini-store-classifications.controller';
import { MiniStoreClassificationsService } from './mini-store-classifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreClassification } from './entities/mini-store-classification.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([MiniStoreClassification], 'colegiodb') ],
  exports: [ MiniStoreClassificationsService ],
  controllers: [MiniStoreClassificationsController],
  providers: [MiniStoreClassificationsService],
})
export class MiniStoreClassificationsModule {}
