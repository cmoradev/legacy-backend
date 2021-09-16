import { Module } from '@nestjs/common';
import { ClassroomPermissionController } from './classroom-permission.controller';
import { ClassroomPermissionService } from './classroom-permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomPermission } from './entities/classroom-permission.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ClassroomPermission], ColegioDBNameConnection) ],
  exports: [ ClassroomPermissionService ],
  controllers: [ClassroomPermissionController],
  providers: [ClassroomPermissionService],
})
export class ClassroomPermissionModule {}
