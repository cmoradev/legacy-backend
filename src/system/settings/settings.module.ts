import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Company } from './entities/company.entity';
import { ConfigModule } from '../../common/config/config.module';
import { ConfigService } from '../../common/config/config.service';

@Module({
    imports: [
        ConfigModule,
        MulterModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dest: configService.getUploadsPath(),
            }),
        }),
        TypeOrmModule.forFeature([Company], ColegioDBNameConnection),
    ],
    providers: [SettingsService],
    exports: [SettingsService],
    controllers: [SettingsController],
})
export class SettingsModule {
}