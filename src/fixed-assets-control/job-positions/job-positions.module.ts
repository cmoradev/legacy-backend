import { Module } from '@nestjs/common';
import { JobPositionsService } from './job-positions.service';
import { JobPositionsController } from './job-positions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPosition } from './entities/job-position.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([JobPosition], ColegioDBNameConnection)],
    providers: [JobPositionsService],
    exports: [JobPositionsService],
    controllers: [JobPositionsController],
})
export class JobPositionsModule {
}
