import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { BranchOffice } from '../system/branch-office/entities/branch-office.entity';
import { CreditNoteSchool } from './entities/credit-note-school.entity';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '../common/config/config.service';

@Injectable()
export class CreditNoteSchoolService extends TypeOrmCrudService<CreditNoteSchool> {
    constructor(
        @InjectRepository(BranchOfficeSetting, ColegioDBNameConnection) readonly branchOfficeSettingRepository: Repository<BranchOfficeSetting>,
        @InjectRepository(CreditNoteSchool, ColegioDBNameConnection) readonly repo: Repository<CreditNoteSchool>,
        @InjectRepository(BranchOffice, ColegioDBNameConnection) readonly branchOfficeRepository: Repository<BranchOffice>,
        private readonly configService: ConfigService
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

    async sendMailCancelacion(currentBranch: BranchOffice, uuid: string, email: string, subject: string, body: string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: currentBranch.Email,
                pass: currentBranch.EmailPass,
            },
        });
        const pathInvoice = `${this.configService.getPath()}comprobantes/notas-credito/` + uuid.toUpperCase();
        const mailOptions: Mail.Options = {
            to: email,
            from: currentBranch.Email,
            subject, // 'Tienda - Solicitud de cancelación del Comprobantes de pago CFDI',
            html: `<div>
                    <h2>Notificación de cancelación de CFDI</h2><br>
                    <h4>Motivo de cancelación: </h4>
                     <p>${body}</p>
                    <p>Adjuntos, le enviamos la factura electrónica y archivo XML que ha sido enviados a su buzón tributario para cancelación.</p>
                    <p>Desde su buzón podrá autorizar o declinar la cancelación del CFDI, cuenta con 72 horas, 
                     transcurrido ese lapso de tiempo se tomará como positivo y se procederá con la cancelación.</p>
                     <p>En caso de ser cancelable sin autorizacion se le adjuntara el acuse de cancelación.</p>
                    <br> 
                    </div>`,
            attachments: [
                {
                    filename: uuid.toUpperCase() + '.xml',
                    path: `${pathInvoice}.xml`,
                },
                {
                    filename: uuid.toUpperCase() + '.pdf',
                    path: `${pathInvoice}.pdf`,
                },
                {
                    filename: `${uuid}-acuse.xml`,
                    path: pathInvoice + '-acuse.xml',
                },
            ],
        };
        return await transporter.sendMail(mailOptions);
    }
}
