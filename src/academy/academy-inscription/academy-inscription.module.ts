import { Module } from '@nestjs/common';
import { AcademyInscriptionService } from './academy-inscription.service';
import { AcademyInscriptionController } from './academy-inscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademyInscription } from './entities/academy-inscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademyInscription], 'colegiodb')],
  exports: [AcademyInscriptionService],
  providers: [AcademyInscriptionService],
  controllers: [AcademyInscriptionController],
})
export class AcademyInscriptionModule {
}
