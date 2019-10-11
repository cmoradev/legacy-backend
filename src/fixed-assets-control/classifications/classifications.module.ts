import { Module } from '@nestjs/common';
import { ClassificationsService } from './classifications.service';
import { ClassificationsController } from './classifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classification } from './entities/classification.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([Classification], ColegioDBNameConnection)],
    providers: [ClassificationsService],
    exports: [ClassificationsService],
    controllers: [ClassificationsController],
})
export class ClassificationsModule {
}
