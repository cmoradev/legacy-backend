import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([Employee], ColegioDBNameConnection)],
    providers: [EmployeesService],
    exports: [EmployeesService],
    controllers: [EmployeesController],
})
export class EmployeesModule {
}
