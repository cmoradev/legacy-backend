import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FormaPagoEnum, MetodoPagoEnum, TipoComprobanteEnum } from '@munyaal/cfdi';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { CreditNoteAcademy } from './entities/credit-note-academy.entity';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '../common/config/config.service';
import { S3Service } from '../common/storage/s3.service';
import { BranchOffice } from '../system/branch-office/entities/branch-office.entity';

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
    FormaPago: FormaPagoEnum;
    NoCertificado: string;
    Certificado: string;s
    condicionesDePago?: string;
    SubTotal: string;
    Descuento: string;
    Moneda: string;
    Total: string;
    TipoDeComprobante: TipoComprobanteEnum;
    MetodoPago: MetodoPagoEnum;
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
        private readonly configService: ConfigService,
        private readonly s3Service: S3Service
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
        const folder = 'comprobantes/notas-credito';
        const xmlBuffer = await this.s3Service.getObjectCommand(`${folder}/${uuid.toUpperCase()}.xml`);
        const pdfBuffer = await this.s3Service.getObjectCommand(`${folder}/${uuid.toUpperCase()}.pdf`);
        const acuseBuffer = await this.s3Service.getObjectCommand(`${folder}/${uuid.toUpperCase()}-acuse.xml`);
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
                    content: xmlBuffer,
                },
                {
                    filename: uuid.toUpperCase() + '.pdf',
                    content: pdfBuffer,
                },
                {
                    filename: `${uuid.toUpperCase()}-acuse.xml`,
                    content: acuseBuffer,
                },
            ],
        };
        return await transporter.sendMail(mailOptions);
    }
}
