import { Get, Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SimpleReport } from '../mini-store-sales-payments/reports/simple.report';
import { ExcelSheet } from '../../common/sheets/interfaces/excel.interface';
import * as Excel from 'exceljs';

@Injectable()
export class MiniStoreSalesService extends TypeOrmCrudService<MiniStoreSale> {
    constructor(
        @InjectRepository(MiniStoreSale, 'colegiodb') readonly repo: Repository<MiniStoreSale>,
    ) {
        super(repo);
    }
}
