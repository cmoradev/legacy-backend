import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Company } from './entities/company.entity';

@Module({
    imports: [
        MulterModule.register({ dest: '/var/www/uploads' }),
        TypeOrmModule.forFeature([Company], ColegioDBNameConnection),
    ],
    providers: [SettingsService],
    exports: [SettingsService],
    controllers: [SettingsController],
})
export class SettingsModule {
}
