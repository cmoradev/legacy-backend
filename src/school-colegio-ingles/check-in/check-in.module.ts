import { Module } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CheckInController } from './check-in.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckIn } from './entities/check-in.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
      TypeOrmModule.forFeature([CheckIn], 'colegiodb'),
      MulterModule.register({
        dest: '/signatures',
      }),
  ],
  providers: [CheckInService],
  controllers: [CheckInController],
  exports: [CheckInService],
})
export class CheckInModule {}
