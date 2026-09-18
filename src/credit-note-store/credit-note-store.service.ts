import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { BranchOfficeSetting } from '../system/branch-office-setting/entities/branch-office-setting.entity';
import { CreditNoteStore } from './entities/credit-note-store.entity';
import { ConfigService } from '../common/config/config.service';
import { S3Service } from '../common/storage/s3.service';
import { MAIL_TEMPLATES, MailService } from '../common/mail';

@Injectable()
export class CreditNoteStoreService extends TypeOrmCrudService<
  CreditNoteStore
> {
  constructor(
    @InjectRepository(CreditNoteStore, ColegioDBNameConnection)
    readonly repo: Repository<CreditNoteStore>,
    @InjectRepository(BranchOfficeSetting, ColegioDBNameConnection)
    readonly branchOfficeSettingRepository: Repository<BranchOfficeSetting>,
    private readonly configService: ConfigService,
    private readonly s3Service: S3Service,
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

  async saveCreditNote(creditNote: Partial<CreditNoteStore>) {
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

  async sendMailCancelacion(
    uuid: string,
    email: string,
    subject: string,
    body: string,
  ) {
    const folder = 'comprobantes/notas-credito';
    const xmlBuffer = await this.s3Service.getObjectCommand(
      `${folder}/${uuid.toLowerCase()}.xml`,
    );
    const pdfBuffer = await this.s3Service.getObjectCommand(
      `${folder}/${uuid.toLowerCase()}.pdf`,
    );
    const acuseBuffer = await this.s3Service.getObjectCommand(
      `${folder}/${uuid.toUpperCase()}-acuse.xml`,
    );

    return this.mailService.sendEmail({
      to: email,
      subject,
      template: MAIL_TEMPLATES.CFDI_CANCELLATION_NOTIFICATION,
      context: {
        title: 'Notificación de cancelación de CFDI',
        reasonLabel: 'Motivo de cancelación',
        reason: body,
        description:
          'Adjuntos, le enviamos la factura electrónica y archivo XML que ha sido enviados a su buzón tributario para cancelación.',
        deadlineNotice:
          'Desde su buzón podrá autorizar o declinar la cancelación del CFDI, cuenta con 72 horas, transcurrido ese lapso de tiempo se tomará como positivo y se procederá con la cancelación.',
        acuseNotice:
          'En caso de ser cancelable sin autorización se le adjuntará el acuse de cancelación.',
      },
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
