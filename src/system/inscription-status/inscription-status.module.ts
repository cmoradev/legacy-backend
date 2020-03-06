import { Module } from '@nestjs/common';
import { InscriptionStatusService } from './inscription-status.service';
import { InscriptionStatusController } from './inscription-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscriptionStatus } from './entities/inscription-status.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([InscriptionStatus], ColegioDBNameConnection)],
  exports: [InscriptionStatusService],
  providers: [InscriptionStatusService],
  controllers: [InscriptionStatusController],
})
export class InscriptionStatusModule {
}
