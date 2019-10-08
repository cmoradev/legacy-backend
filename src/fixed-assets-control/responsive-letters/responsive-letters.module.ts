import { Module } from '@nestjs/common';
import { ResponsiveLettersService } from './responsive-letters.service';
import { ResponsiveLettersController } from './responsive-letters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsiveLetter } from './entities/responsive-letter.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([ResponsiveLetter], ColegioDBNameConnection)],
    providers: [ResponsiveLettersService],
    exports: [ResponsiveLettersService],
    controllers: [ResponsiveLettersController],
})
export class ResponsiveLettersModule {
}
