import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { BranchOffice } from '../system/branch-office/entities/branch-office.entity';
import { CreditNoteSchool } from './entities/credit-note-school.entity';
import { ComprobanteDownloadService } from '../common/storage/comprobante-download.service';
import { MAIL_TEMPLATES, MailService } from '../common/mail';
import * as fs from 'fs';

@Injectable()
export class CreditNoteSchoolService extends TypeOrmCrudService<
  CreditNoteSchool
> {
  constructor(
    @InjectRepository(BranchOfficeSetting, ColegioDBNameConnection)
    readonly branchOfficeSettingRepository: Repository<BranchOfficeSetting>,
    @InjectRepository(CreditNoteSchool, ColegioDBNameConnection)
    readonly repo: Repository<CreditNoteSchool>,
    @InjectRepository(BranchOffice, ColegioDBNameConnection)
    readonly branchOfficeRepository: Repository<BranchOffice>,
    private readonly comprobanteDownloadService: ComprobanteDownloadService,
    private readonly mailService: MailService,
  ) {
    super(repo);
  }

  public async softDeleteOne(id: number) {
    const object = await this.findOne(id);
    if (!object) {
      throw new NotFoundException('This entity does not exists');
    }
    return await this.repo.softDelete(id);
  }

  public async softRestoreOne(id: number) {
    const object = await this.repo.findOne({ id }, { withDeleted: true });
    if (!object) {
      throw new NotFoundException('This entity does not exists');
    }
    return await this.repo.restore(id);
  }

  async saveCreditNote(creditNote: Partial<CreditNoteSchool>) {
    return await this.repo.save(creditNote);
  }

  async branchOfficeSetting(
    branchOfficeId: string | number,
    branchOfficeModuleId: string | number,
  ) {
    const settingsBranchOffice = await this.branchOfficeSettingRepository
      .createQueryBuilder('setting')
      .leftJoin('setting.invoiceCampus', 'branchOffice')
      .where('branchOffice.id = :branchOfficeId', {
        branchOfficeId: branchOfficeId,
      })
      .andWhere('setting.id = :settingsId', {
        settingsId: branchOfficeModuleId,
      })
      .getOne();

    return settingsBranchOffice;
  }

  async getLastFolio() {
    return await this.repo
      .createQueryBuilder('creditNote')
      .select('COALESCE(MAX(id), 0) + 1', 'last')
      .getRawOne();
  }

  async sendMail(email: string, invoice: string, uuid) {
    const xmlBuffer = fs.readFileSync(`${invoice}.xml`);
    const pdfBuffer = fs.readFileSync(`${invoice}.pdf`);

    return this.mailService.sendEmail({
      to: email,
      subject: 'Factura electrónica CFDI',
      template: MAIL_TEMPLATES.CFDI_ISSUED,
      attachments: [
        {
          filename: uuid.toUpperCase() + '.xml',
          contentType: 'application/xml',
          content: xmlBuffer,
        },
        {
          filename: uuid.toUpperCase() + '.pdf',
          contentType: 'application/pdf',
          content: pdfBuffer,
        },
      ],
    });
  }

  async sendMailCancelacion(uuid: string, email: string) {
    const folder = 'notas-credito';
    const xmlBuffer = await this.comprobanteDownloadService.requireObjectCaseInsensitive(
      folder,
      uuid,
      '.xml',
    );
    const pdfBuffer = await this.comprobanteDownloadService.requireObjectCaseInsensitive(
      folder,
      uuid,
      '.pdf',
    );
    const acuseBuffer = await this.comprobanteDownloadService.requireObjectCaseInsensitive(
      folder,
      uuid,
      '-acuse.xml',
    );

    return this.mailService.sendEmail({
      to: email,
      subject: 'Notificación de cancelación de CFDI',
      template: MAIL_TEMPLATES.CFDI_CANCELLATION,
      attachments: [
        {
          filename: uuid.toUpperCase() + '.xml',
          contentType: 'application/xml',
          content: xmlBuffer,
        },
        {
          filename: uuid.toUpperCase() + '.pdf',
          contentType: 'application/pdf',
          content: pdfBuffer,
        },
        {
          filename: `${uuid.toUpperCase()}-acuse.xml`,
          contentType: 'application/xml',
          content: acuseBuffer,
        },
      ],
    });
  }
}
