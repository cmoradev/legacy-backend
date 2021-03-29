import { Module } from '@nestjs/common';
import { InscriptionsController } from './inscriptions.controller';
import { InscriptionsService } from './inscriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscription } from './entities/inscription.entity';
import { MulterModule } from '@nestjs/platform-express';
import { Student } from '../students/entities/student.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { ClassroomsModule } from '../classrooms/classrooms.module';
import { LevelsModule } from '../levels/levels.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Inscription, Student], ColegioDBNameConnection),
        ClassroomsModule,
        LevelsModule,
        MulterModule.register({
            dest: './upload',
        }),
    ],
    exports: [InscriptionsService],
    controllers: [InscriptionsController],
    providers: [InscriptionsService],
})
export class InscriptionsModule {
}
