import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ Teacher ], 'colegiodb') ],
  exports: [ TeachersService ],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
