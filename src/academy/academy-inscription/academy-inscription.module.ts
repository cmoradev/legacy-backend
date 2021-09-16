import { Module } from '@nestjs/common';
import { AcademyInscriptionService } from './academy-inscription.service';
import { AcademyInscriptionController } from './academy-inscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademyInscription } from './entities/academy-inscription.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([AcademyInscription], ColegioDBNameConnection)],
  exports: [AcademyInscriptionService],
  providers: [AcademyInscriptionService],
  controllers: [AcademyInscriptionController],
})
export class AcademyInscriptionModule {
}
