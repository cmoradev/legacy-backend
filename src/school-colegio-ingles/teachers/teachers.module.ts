import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ Teacher ], ColegioDBNameConnection) ],
  exports: [ TeachersService ],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
