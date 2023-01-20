import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { XmlCdfi } from '@signati/core';
import { PDF } from '@signati/pdf';
import { readFileSync } from 'fs';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { InvoiceStatus } from '../invoice/types/invoice-status';
import { InvoiceType } from '../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum';
import { A117 } from '../pdf/A117/desing/A117';
import { SchoolChargesInvoice } from '../school-colegio-ingles/charges-school/school-charges-invoice/entities/school-charges-invoice.entity';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { BranchOffice } from '../system/branch-office/entities/branch-office.entity';
import { User } from '../system/users/entities/user.entity';
import { StampV4 } from '../webService/FactSw';
import { CreditNoteSchool } from './entities/credit-note-school.entity';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class CreditNoteSchoolService extends TypeOrmCrudService<CreditNoteSchool> {
    constructor(
        @InjectRepository(BranchOfficeSetting, ColegioDBNameConnection) readonly branchOfficeSettingRepository: Repository<BranchOfficeSetting>,
        @InjectRepository(CreditNoteSchool, ColegioDBNameConnection) repo: Repository<CreditNoteSchool>,
        @InjectRepository(BranchOffice, ColegioDBNameConnection) readonly branchOfficeRepository: Repository<BranchOffice>,
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
        creditNote: Partial<CreditNoteSchool>
    ) {
       return await this.repo.save(creditNote);
    }

    async branchOfficeSetting(
        branchOfficeId: string | number,
        branchOfficeModuleId: string | number,
    ) {
        const settingsBranchOffice = await this.branchOfficeSettingRepository
            .createQueryBuilder('setting')
            .leftJoin('setting.invoiceCampus', 'branchOffice')
            .where('branchOffice.id = :branchOfficeId', { branchOfficeId: branchOfficeId })
            .andWhere('setting.id = :settingsId', { settingsId: branchOfficeModuleId })
            .getOne();

        return settingsBranchOffice;
    }

    async getLastFolio() {
        return await this.repo.createQueryBuilder('creditNote')
            .select('COALESCE(MAX(id), 0) + 1', 'last')
            .getRawOne();
    }

    async sendMail(branchOfficeId: string | number, email: string, invoice: string, uuid) {
        const branchOffice = await this.branchOfficeRepository.createQueryBuilder('branchOffice')
            .where('branchOffice.id = :branchOfficeId', { branchOfficeId: branchOfficeId }).getOne();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: branchOffice.Email,
                pass: branchOffice.EmailPass,
            },
        });
        const mailOptions: Mail.Options = {
            to: email,
            from: branchOffice.Email,
            subject: 'Comprobantes de pago CFDI',
            text: 'CFDI',
            html: '<div> <h2>Gracias por su pago</h2><br><p>Adjuntos, le enviamos su factura electrónica y archivo XML</p><br><br></div>',
            attachments: [
                {
                    filename: uuid.toUpperCase() + '.xml',
                    path: `${invoice}.xml`,
                },
                {
                    filename: uuid.toUpperCase() + '.pdf',
                    path: `${invoice}.pdf`,
                },
            ],
        };
        return await transporter.sendMail(mailOptions);

    }
}
