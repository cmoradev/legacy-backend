import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreSale } from '../../mini-store/store-sales/mini-store-sales/entities/mini-store-sale.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Student } from '../../school-colegio-ingles/students/entities/student.entity';
import { User } from '../users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MiniStoreSale, Student, User], ColegioDBNameConnection)],
    providers: [StatsService],
    controllers: [StatsController],
})
export class StatsModule {
}
