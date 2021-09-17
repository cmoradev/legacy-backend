import { Module } from '@nestjs/common';
import { RouteActionController } from './route-action.controller';
import { RouteActionService } from './route-action.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from '../routes/entities/route.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { RouteAction } from './entities/route-action.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RouteAction], ColegioDBNameConnection)],
    controllers: [RouteActionController],
    providers: [RouteActionService],
    exports: [RouteActionService],
})
export class RouteActionModule {
}
