import { Module } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { PeriodsController } from './periods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Periods } from './entities/periods.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([Periods], ColegioDBNameConnection)],
    providers: [PeriodsService],
    controllers: [PeriodsController],
})
export class PeriodsModule {
}
