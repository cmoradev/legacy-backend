import { Module } from '@nestjs/common';
import { SchoolChargesController } from './school-charges.controller';
import { SchoolChargesService } from './school-charges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolCharge } from './entities/school-charge.entity';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { AuthModule } from '../../../system/auth/auth.module';
import { User } from '../../../system/users/entities/user.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([SchoolCharge, User], ColegioDBNameConnection), 
      AuthModule
    ],
    controllers: [SchoolChargesController],
    providers: [SchoolChargesService],
})
export class SchoolChargesModule {
}
