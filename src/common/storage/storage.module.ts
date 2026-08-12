import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { SmartWeb } from '../../Provider/swsmart.provider';
import { S3Service } from './s3.service';
import { ComprobanteDownloadService } from './comprobante-download.service';

@Module({
  imports: [ConfigModule],
  providers: [S3Service, ComprobanteDownloadService, SmartWeb],
  exports: [S3Service, ComprobanteDownloadService],
})
export class StorageModule {}