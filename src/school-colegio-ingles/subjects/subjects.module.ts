import { Module } from '@nestjs/common';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Subject,
        ], ColegioDBNameConnection),
    ],
    exports: [SubjectsService],
    controllers: [SubjectsController],
    providers: [SubjectsService],
})
export class SubjectsModule {
}
