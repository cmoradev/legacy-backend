import { Module } from '@nestjs/common';
import { InscriptionStatusService } from './inscription-status.service';
import { InscriptionStatusController } from './inscription-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscriptionStatus } from './entities/inscription-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InscriptionStatus], 'colegiodb')],
  exports: [InscriptionStatusService],
  providers: [InscriptionStatusService],
  controllers: [InscriptionStatusController],
})
export class InscriptionStatusModule {
}
