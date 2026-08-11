import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Company } from './entities/company.entity';
import { StorageModule } from '../../common/storage/storage.module';

@Module({
    imports: [
        StorageModule,
        TypeOrmModule.forFeature([Company], ColegioDBNameConnection),
    ],
    providers: [SettingsService],
    exports: [SettingsService],
    controllers: [SettingsController],
})
export class SettingsModule {
}