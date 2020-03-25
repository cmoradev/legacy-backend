import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [MulterModule.register({
        dest: '/var/www/uploads',
    })],
    providers: [SettingsService],
    controllers: [SettingsController],
})
export class SettingsModule {
}
