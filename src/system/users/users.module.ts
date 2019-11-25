import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Teacher } from '../../school-colegio-ingles/teachers/entities/teacher.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([User, Teacher], 'colegiodb') ],
  exports: [ UsersService ],
  controllers: [ UsersController ],
  providers: [ UsersService ],
})
export class UsersModule {}
