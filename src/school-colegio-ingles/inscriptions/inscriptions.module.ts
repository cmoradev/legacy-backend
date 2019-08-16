import { Module } from '@nestjs/common';
import { InscriptionsController } from './inscriptions.controller';
import { InscriptionsService } from './inscriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscription } from './entities/inscription.entity';
import { MulterModule } from '@nestjs/platform-express';
import { Student } from '../students/entities/student.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Inscription, Student], 'colegiodb'),
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
