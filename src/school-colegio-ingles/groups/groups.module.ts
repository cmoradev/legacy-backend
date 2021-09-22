import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ Group ], ColegioDBNameConnection) ],
  exports: [  GroupsService ],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
