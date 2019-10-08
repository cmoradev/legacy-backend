import { Module } from '@nestjs/common';
import { FixedAssetsService } from './fixed-assets.service';
import { FixedAssetsController } from './fixed-assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FixedAsset } from './entities/fixed-asset.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([FixedAsset], ColegioDBNameConnection)],
    providers: [FixedAssetsService],
    exports: [FixedAssetsService],
    controllers: [FixedAssetsController],
})
export class FixedAssetsModule {
}
