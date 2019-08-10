import { Module } from '@nestjs/common';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Assignment], 'colegiodb'),
    ],
    exports: [AssignmentsService],
    controllers: [AssignmentsController],
    providers: [AssignmentsService],
})
export class AssignmentsModule {
}
