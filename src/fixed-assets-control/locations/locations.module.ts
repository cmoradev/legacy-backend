import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([Location], ColegioDBNameConnection)],
    providers: [LocationsService],
    exports: [LocationsService],
    controllers: [LocationsController],
})
export class LocationsModule {
}
