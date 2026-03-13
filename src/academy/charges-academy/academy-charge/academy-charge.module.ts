import { Module } from '@nestjs/common';
import { AcademyChargeService } from './academy-charge.service';
import { AcademyChargeController } from './academy-charge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { AcademyCharge } from './entities/academy-charge.entity';
import { AuthModule } from '../../../system/auth/auth.module';
import { User } from '../../../system/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AcademyCharge, User], ColegioDBNameConnection),
    AuthModule
  ],
  providers: [AcademyChargeService],
  controllers: [AcademyChargeController],
})
export class AcademyChargeModule {
}
