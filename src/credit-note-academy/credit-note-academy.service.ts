import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CFDI, Comprobante, FormaPago, MetodoPago, TipoComprobante } from '@signati/core';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { CreditNoteAcademy } from './entities/credit-note-academy.entity';

type IBodyCreditNoteAcademy = {
    serie: string;
    folio: string;
    fecha: string;

}

@Injectable()
export class CreditNoteAcademyService extends TypeOrmCrudService<CreditNoteAcademy> {
    constructor(
        @InjectRepository(CreditNoteAcademy, ColegioDBNameConnection) readonly repo: Repository<CreditNoteAcademy>,
        @InjectRepository(BranchOfficeSetting, ColegioDBNameConnection) readonly branchOfficeSettingRepository: Repository<BranchOfficeSetting>
    ) {
        super(repo);
    }

    async getFolio() {
        const folio = await this.repo.createQueryBuilder('creditNote').select('MAX(creditNote.id)', 'folio').getRawOne();
        console.log(folio);
        return 1;
    }
    async createCreditNote() {
        const cfdiAttributes: Comprobante = {
            Serie: '',
            Folio: '',
            Fecha: '',
            Sello: '',
            FormaPago: FormaPago.EFECTIVO,
            NoCertificado: '',
            Certificado: '',
            SubTotal: '',
            Descuento: '',
            Moneda: '',
            Total: '',
            TipoDeComprobante: TipoComprobante.INGRESO,
            MetodoPago: MetodoPago.PAGO_EN_UNA_EXHIBICION,
            LugarExpedicion: ''
        }
        const comprobante = new CFDI(cfdiAttributes);
    }
}
