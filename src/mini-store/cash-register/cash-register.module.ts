import { Module } from '@nestjs/common';
import { CashRegisterService } from './cash-register.service';
import { CashRegisterController } from './cash-register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashRegister } from './entities/cash-register.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([CashRegister], ColegioDBNameConnection)],
    providers: [CashRegisterService],
    exports: [CashRegisterService],
    controllers: [CashRegisterController],
})
export class CashRegisterModule {
}
