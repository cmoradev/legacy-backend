import { Module } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CheckInController } from './check-in.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckIn } from './entities/check-in.entity';
import { MulterModule } from '@nestjs/platform-express';
import { Department } from '../../system/departments/entities/department.entity';
import { IntegrationsModule } from '../../integrations/integrations.module';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([CheckIn, Department], ColegioDBNameConnection),
      MulterModule.register({
        dest: '/signatures',
      }),
    IntegrationsModule,
  ],
  providers: [CheckInService],
  controllers: [CheckInController],
  exports: [CheckInService],
})
export class CheckInModule {}
