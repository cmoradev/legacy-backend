import { Module } from '@nestjs/common';
import { ModalitiesController } from './modalities.controller';
import { ModalitiesService } from './modalities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modality } from './entities/modality.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Modality], ColegioDBNameConnection),
    ],
    exports: [ModalitiesService],
    controllers: [ModalitiesController],
    providers: [ModalitiesService],
})
export class ModalitiesModule {
}
