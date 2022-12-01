import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { XmlCdfi } from '@signati/core';
import { PDF } from '@signati/pdf';
import { readFileSync } from 'fs';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { CreditNoteSchool } from '../credit-note-school/entities/credit-note-school.entity';
import { InvoiceStatus } from '../invoice/types/invoice-status';
import { MiniStoreInvoice } from '../mini-store/store-sales/mini-store-invoices/entities/mini-store-invoice.entity';
import { InvoiceType } from '../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum';
import { A117 } from '../pdf/A117/desing/A117';
import { SchoolChargesInvoice } from '../school-colegio-ingles/charges-school/school-charges-invoice/entities/school-charges-invoice.entity';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { BranchOffice } from '../system/branch-office/entities/branch-office.entity';
import { User } from '../system/users/entities/user.entity';
import { StampV4 } from '../webService/FactSw';
import { CreditNoteStore } from './entities/credit-note-store.entity';

@Injectable()
export class CreditNoteStoreService extends TypeOrmCrudService<CreditNoteStore> {
    constructor(
        @InjectRepository(CreditNoteStore, ColegioDBNameConnection) repo: Repository<CreditNoteStore>,
        @InjectRepository(BranchOfficeSetting, ColegioDBNameConnection) readonly branchOfficeSettingRepository: Repository<BranchOfficeSetting>) {
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
        cfdi: XmlCdfi,
        timbrado: StampV4,
        invoices: MiniStoreInvoice[],
        branchOfficeId: string | number,
        branchOfficeModuleId: string | number,
        userCreatorId: string | number,
        workPath: string
    ) {
        const invoicesId = invoices.map((invoice) => {
            return invoice.id;
        })
        const creditNoteAcademy: Partial<CreditNoteSchool> = {
            folio: `${cfdi['cfdi:Comprobante']._attributes.Serie}-${cfdi['cfdi:Comprobante']._attributes.Folio}`,
            uuid: timbrado.data.uuid,
            businessName: cfdi['cfdi:Comprobante']['cfdi:Receptor']._attributes.Nombre,
            rfc: cfdi['cfdi:Comprobante']['cfdi:Receptor']._attributes.Rfc,
            total: +cfdi['cfdi:Comprobante']._attributes.Total,
            invoiceType: InvoiceType.expenses,
            status: InvoiceStatus.billed,
            invoiceBranchOffice: { id: branchOfficeId } as BranchOffice,
            agentBilling: { id: userCreatorId } as User,
            invoiceSchool: invoicesId as unknown as SchoolChargesInvoice[],
        }
        await this.repo.save(creditNoteAcademy);
        const settingsBranchOffice = await this.branchOfficeSettingRepository.createQueryBuilder('setting').leftJoin('setting.invoiceCampus', 'branchOffice').where('branchOffice.id = :branchOfficeId', { branchOfficeId: branchOfficeId }).andWhere('setting.id = :settingsId', { settingsId: branchOfficeModuleId }).getOne();
        const pathXml = `${workPath}comprobantes/notas-credito/` + timbrado.data.uuid.toUpperCase() + '.xml';
        const logo = readFileSync(`${workPath}logos/academiaslogo.png`);
        const desingpdf = new A117(pathXml, {
            lugarExpedicion: settingsBranchOffice.address,
            logo: `data:image/png;base64, ${logo.toString('base64')}`,
        });
        const pdf = new PDF<A117>(desingpdf);
        await pdf.save(`${workPath}comprobantes/notas-credito/` + timbrado.data.uuid.toUpperCase());
    }
    async branchOfficeSetting(branchOfficeId: string | number, branchOfficeModuleId: string | number) {

        const settingsBranchOffice = await this.branchOfficeSettingRepository
            .createQueryBuilder('setting')
            .leftJoin('setting.invoiceCampus', 'branchOffice')
            .where('branchOffice.id = :branchOfficeId', { branchOfficeId: branchOfficeId })
            .andWhere('setting.id = :settingsId', { settingsId: branchOfficeModuleId })
            .getOne();
        return settingsBranchOffice
    }
    async getLastFolio() {
        return await this.repo.createQueryBuilder('creditNote')
            .select('COALESCE(MAX(id), 0) + 1', 'last')
            .getRawOne();
    }
}
