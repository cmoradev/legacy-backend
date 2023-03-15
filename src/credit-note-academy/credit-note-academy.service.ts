import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FormaPago, FormaPagoType, MetodoPago, MetodoPagoType, TipoComprobante, TypeComprobante, XmlCdfi } from '@signati/core';
import { PDF } from '@signati/pdf';
import { readFileSync } from 'fs';
import { Repository } from 'typeorm';
import { AcademyChargeInvoice } from '../academy/charges-academy/academy-charge-invoice/entities/academy-charge-invoice.entity';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { InvoiceStatus } from '../invoice/types/invoice-status';
import { InvoiceType } from '../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum';
import { A117 } from '../pdf/A117/desing/A117';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { BranchOffice } from '../system/branch-office/entities/branch-office.entity';
import { User } from '../system/users/entities/user.entity';
import { StampV4 } from '../webService/FactSw';
import { CreditNoteAcademy } from './entities/credit-note-academy.entity';
export interface ConceptWithTaxes {
    ClaveProdServ: string;
    NoIdentificacion: string;
    Cantidad: number | string;
    ClaveUnidad: string;
    Unidad?: string;
    Descripcion: string;
    ValorUnitario: number | string;
    Importe: number | string;
    Descuento: number | string;
    impuestosTransladados?: {
        Base?: string;
        Impuesto: string;
        TipoFactor: string;
        TasaOCuota: string;
        Importe: string;
    },
    impuestosRetenidos?: {
        Base?: string;
        Impuesto: string;
        TipoFactor: string;
        TasaOCuota: string;
        Importe: string;
    },
}

export interface InvoiceSat {
    Version?: string;
    Serie: string;
    Folio: string;
    Fecha: string;
    Sello: string;
    FormaPago: FormaPago | FormaPagoType;
    NoCertificado: string;
    Certificado: string;
    condicionesDePago?: string;
    SubTotal: string;
    Descuento: string;
    Moneda: string;
    Total: string;
    TipoDeComprobante: TipoComprobante | TypeComprobante;
    MetodoPago: MetodoPago | MetodoPagoType;
    LugarExpedicion: string;
    Impuesto: string;
    TasaOCuota: string;
    TipoFactor: string;
}

@Injectable()
export class CreditNoteAcademyService extends TypeOrmCrudService<CreditNoteAcademy> {
    constructor(
        @InjectRepository(CreditNoteAcademy, ColegioDBNameConnection) readonly repo: Repository<CreditNoteAcademy>,
        @InjectRepository(BranchOfficeSetting, ColegioDBNameConnection) readonly branchOfficeSettingRepository: Repository<BranchOfficeSetting>,
    ) {
        super(repo);
    }

    public async softDeleteOne(id: number) {
        const object = await this.findOne(id);
        if (!object) {
            throw new NotFoundException('This entity does not exists')
        }
        return await this.repo.softDelete(id);
    }

    public async softRestoreOne(id: number) {
        const object = await this.repo.findOne({id}, {withDeleted: true});
        if (!object) {
            throw new NotFoundException('This entity does not exists')
        }
        return await this.repo.restore(id);
    }

    async saveCreditNote(
        creditNote: Partial<CreditNoteAcademy>
    ) {
       return await this.repo.save(creditNote);
    }

    async branchOfficeSetting(branchOfficeId: string | number, branchOfficeModuleId: string | number) {
        const settingsBranchOffice = await this.branchOfficeSettingRepository.createQueryBuilder('setting')
            .leftJoin('setting.invoiceCampus', 'branchOffice')
            .where('branchOffice.id = :branchOfficeId', { branchOfficeId: branchOfficeId })
            .andWhere('setting.id = :settingsId', { settingsId: branchOfficeModuleId }).getOne();
        return settingsBranchOffice
    }

    async getLastFolio() {
        return await this.repo.createQueryBuilder('creditNote')
            .select('COALESCE(MAX(id), 0) + 1', 'last')
            .getRawOne();
    }
}
