import { Module } from '@nestjs/common';
import { FamilyFiscalService } from './family-fiscal.service';
import { FamilyFiscalController } from './family-fiscal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from '../families/entities/family.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { BusinessNameFamily } from './entities/BusinessNameFamily.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BusinessNameFamily], ColegioDBNameConnection)],
    providers: [FamilyFiscalService],
    controllers: [FamilyFiscalController],
    exports: [FamilyFiscalService],
})
export class FamilyFiscalModule {
}
