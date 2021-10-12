import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([ Role ], ColegioDBNameConnection)],
  exports: [  RolesService ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
