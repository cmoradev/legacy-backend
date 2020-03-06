import { Module } from '@nestjs/common';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Action } from './entities/action.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ Action ], ColegioDBNameConnection) ],
  exports: [ ActionsService ],
  controllers: [ActionsController],
  providers: [ActionsService],
})
export class ActionsModule {}
