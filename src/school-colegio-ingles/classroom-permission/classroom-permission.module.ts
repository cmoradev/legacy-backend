import { Module } from '@nestjs/common';
import { ClassroomPermissionController } from './classroom-permission.controller';
import { ClassroomPermissionService } from './classroom-permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassroomPermission } from './entities/classroom-permission.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ClassroomPermission], 'colegiodb') ],
  exports: [ ClassroomPermissionService ],
  controllers: [ClassroomPermissionController],
  providers: [ClassroomPermissionService],
})
export class ClassroomPermissionModule {}
