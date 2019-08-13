import { Module } from '@nestjs/common';
import { CyclesService } from './cycles.service';
import { CyclesController } from './cycles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cycle } from './entities/cycle.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ Cycle ], 'colegiodb')],
  exports: [ CyclesService ],
  providers: [CyclesService],
  controllers: [CyclesController],
})
export class CyclesModule {}
