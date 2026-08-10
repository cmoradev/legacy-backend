import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { S3Service } from './s3.service';
import { ComprobanteDownloadService } from './comprobante-download.service';

@Module({
  imports: [ConfigModule],
  providers: [S3Service, ComprobanteDownloadService],
  exports: [S3Service, ComprobanteDownloadService],
})
export class StorageModule {}