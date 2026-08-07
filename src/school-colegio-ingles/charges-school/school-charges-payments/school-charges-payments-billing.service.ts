import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { Connection, Repository } from 'typeorm';
import { SchoolChargePayment } from './entities/school-charge-payment.entity';
import { QuerySchoolPaymentBilling } from '../../school-payments/interfaces/InvoiceSchoolPayment.interface';
import { SchoolCharge } from '../school-charges/entities/school-charge.entity';
import { User } from '../../../system/users/entities/user.entity';
import { InvoiceMethodPayment } from '../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import { BranchOfficeSetting } from '../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { SchoolChargesInvoice } from '../school-charges-invoice/entities/school-charges-invoice.entity';
import { ConfigService } from '../../../common/config/config.service';
import { InvoiceModules } from "../../../common/point-of-sale/types.pos";
import { AuthService } from '../../../system/auth/auth.service';
import {
  GenerateInvoiceMunyaal,
  GenerateGlobalInvoiceMunyaal,
  FullGenerateResult,
  InvoiceStepError,
} from '../../../common/utils/invoice/generator/generateInvoice';
import { getDetailsPaymentsGlobal } from '../../../common/point-of-sale/utils';
import {
  ConceptsPriceByPaymentBilligCalculation,
} from '../../../common/calculations/calculation';
import { Environment } from '../../../common/point-of-sale/types.pos';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';
import {
  ExportacionEnum as ExportacionEnumMunyaal,
  MetodoPagoEnum,
  MonedaEnum,
  TipoComprobanteEnum,
  FormaPagoEnum,
  ObjetoImpEnum,
  RegimenFiscalEnum,
  UsoCfdiEnum,
} from '@munyaal/cfdi';
import { SchoolChargesInvoiceService } from '../school-charges-invoice/school-charges-invoice.service';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { StudentsService } from '../../students/students.service';
import { S3Service } from '../../../common/storage/s3.service';
import { Inject, forwardRef } from '@nestjs/common';
import { SchoolChargesPaymentsService } from './school-charges-payments.service';

export interface BillingResponse {
  stamping: boolean;
  msg: string;
  invoice: any;
  uuid: string;
  warnings: InvoiceStepError[];
  statusUpdated: boolean;
  emailSent: boolean;
}

export interface GlobalBillingResponse {
  uuid: string;
  invoice: any;
  stamping: boolean;
  concepts: any[];
  msg: string;
  statusUpdated: boolean;
  emailSent: boolean;
  warnings: InvoiceStepError[];
}

@Injectable()
export class SchoolChargesPaymentsBillingService extends TypeOrmCrudService<SchoolChargePayment> {
    constructor(
        @InjectRepository(SchoolChargePayment, ColegioDBNameConnection)
        readonly repo: Repository<SchoolChargePayment>,
        @InjectRepository(SchoolChargesInvoice, ColegioDBNameConnection)
        readonly invoiceRepository: Repository<SchoolChargesInvoice>,
        @InjectRepository(SchoolCharge, ColegioDBNameConnection)
        readonly schoolChargeRepo: Repository<SchoolCharge>,
        @InjectRepository(User, ColegioDBNameConnection) readonly userRepository: Repository<User>,
        @InjectRepository(InvoiceMethodPayment, ColegioDBNameConnection) readonly invoiceMethodPaymentRepository: Repository<InvoiceMethodPayment>,
        private readonly configService: ConfigService,
        @InjectConnection(ColegioDBNameConnection) private connection: Connection,
        private readonly authService: AuthService,
        @Inject(forwardRef(() => SchoolChargesInvoiceService))
        private readonly schoolChargeInvoiceService: SchoolChargesInvoiceService,
        private readonly branchOfficeService: BranchOfficeService,
        private readonly branchOfficeSettingService: BranchOfficeSettingService,
        private readonly studentsService: StudentsService,
        private readonly s3Service: S3Service,
        private readonly service: SchoolChargesPaymentsService
    ) {
        super(repo);
    }

    async updatePayment(data: SchoolChargePayment) {
        let payment = await this.repo.findOne({id: data.id});
        payment = {...data};
        return await this.repo.save(payment);
    }

    public async updateStampingPayments(ids: number[], uuid: string): Promise<any> {
        try {
            return this.connection.query(`
                UPDATE school_charge_payments p
                SET stamping   = 1,
                    globalUuid = '${uuid}'
                WHERE p.id IN (${ids.join(',')});
            `);
        } catch (e) {
            throw new NotFoundException('Error updating payments to invoiced');
        }
    }

    /**
     * Verifica si un pago ya fue timbrado o tiene un timbrado pendiente.
     * Retorna la factura existente si ya está timbrada, o null si se puede timbrar.
     */
    async checkExistingStamping(chargePaymentId: number): Promise<{
      action: 'return_existing' | 'check_pending' | 'proceed';
      invoice?: SchoolChargesInvoice;
      response?: BillingResponse;
    }> {
      // Caso 1: Ya existe factura con stamping=1
      const existingInvoiced = await this.schoolChargeInvoiceService.findInvoiceByPayment({
        paymentId: chargePaymentId,
        status: StatusInvoce.invoiced,
        stamping: 1,
      });

      if (existingInvoiced) {
        return {
          action: 'return_existing',
          invoice: existingInvoiced,
          response: {
            stamping: true,
            msg: 'PAGO FACTURADO',
            invoice: existingInvoiced,
            uuid: existingInvoiced.uuid,
            warnings: [],
            statusUpdated: true,
            emailSent: false,
          },
        };
      }

      // Caso 2: Hay factura con pendingStampUuid (timbrado exitoso pero DB no se actualizó)
      const pendingInvoice = await this.invoiceRepository
        .createQueryBuilder('inv')
        .innerJoin('inv.schoolChargePayment', 'pay')
        .where('pay.id = :paymentId', { paymentId: chargePaymentId })
        .andWhere('inv.pendingStampUuid IS NOT NULL')
        .getOne();

      if (pendingInvoice) {
        // Intentar completar la actualización pendiente
        try {
          pendingInvoice.uuid = pendingInvoice.pendingStampUuid;
          pendingInvoice.status = 1;
          await this.schoolChargeInvoiceService.updateInvoice(pendingInvoice);

          await this.updatePayment({
            id: chargePaymentId,
            stamping: 1,
          } as SchoolChargePayment);

          pendingInvoice.pendingStampUuid = null;
          pendingInvoice.pendingStampAt = null;
          await this.schoolChargeInvoiceService.updateInvoice(pendingInvoice);

          return {
            action: 'return_existing',
            invoice: pendingInvoice,
            response: {
              stamping: true,
              msg: 'PAGO FACTURADO (recuperado de timbrado pendiente)',
              invoice: pendingInvoice,
              uuid: pendingInvoice.uuid,
              warnings: [{
                step: 'recovery',
                message: 'Se recuperó un timbrado que no se había actualizado en BD',
              }],
              statusUpdated: true,
              emailSent: false,
            },
          };
        } catch (err) {
          // No se pudo recuperar, pero el UUID existe en el SAT
          return {
            action: 'return_existing',
            invoice: pendingInvoice,
            response: {
              stamping: true,
              msg: 'FACTURA TIMBRADA PERO CON ERROR EN ACTUALIZACIÓN DE BD. Contacte a soporte.',
              invoice: pendingInvoice,
              uuid: pendingInvoice.pendingStampUuid,
              warnings: [{
                step: 'recovery',
                message: `No se pudo completar la recuperación: ${err.message}`,
              }],
              statusUpdated: false,
              emailSent: false,
            },
          };
        }
      }

      return { action: 'proceed' };
    }

    /**
     * Guarda el UUID pendiente cuando el timbrado fue exitoso
     * pero la actualización de BD falló.
     */
    async savePendingStamp(invoiceId: number, uuid: string): Promise<void> {
      try {
        await this.invoiceRepository
          .createQueryBuilder()
          .update(SchoolChargesInvoice)
          .set({
            pendingStampUuid: uuid,
            pendingStampAt: new Date(),
          })
          .where('id = :id', { id: invoiceId })
          .execute();
      } catch (err) {
        console.error('Error saving pending stamp:', err);
      }
    }

    /**
     * Orquestador principal del proceso de facturación.
     */
    async processBilling(query: QuerySchoolPaymentBilling): Promise<BillingResponse> {
      const response: BillingResponse = {
        stamping: false,
        msg: '',
        invoice: null,
        uuid: '',
        warnings: [],
        statusUpdated: false,
        emailSent: false,
      };

      // ── 1. Obtener datos base ──
      const result = await this.service.findSaleByPayment(query);
      const invoiceDetails = ConceptsPriceByPaymentBilligCalculation({
        payment: result.payment,
        details: result.charge.chargesDetails,
        type: InvoiceModules.SCHOOL,
        ivaDefault: 1,
        ivaByDetail: 0,
        typeConcept: 'Invoice',
      });

      const currentOffice = await this.branchOfficeService.findBranch(query.branchOfficeId);
      const branchOfficeSett = await this.branchOfficeSettingService.findOne({
        where: { id: query.branchOfficeSettingId },
      });

      // ── 2. Idempotencia: verificar si ya está timbrado ──
      const existingCheck = await this.checkExistingStamping(query.chargePaymentId);
      if (existingCheck.action === 'return_existing') {
        return existingCheck.response;
      }

      // ── 3. Buscar o crear registro de factura ──
      let invoiceRecord = await this.schoolChargeInvoiceService.findInvoiceByPayment({
        paymentId: query.chargePaymentId,
        status: StatusInvoce.noBilling,
      });

      if (!invoiceRecord) {
        const factura = new SchoolChargesInvoice();
        factura.folio = '';
        factura.uuid = '';
        factura.businessName = query.receiver.businessName;
        factura.rfc = query.receiver.rfc;
        factura.agentBilling = { id: query.agentBillingId } as User;
        factura.status = 0;
        factura.schoolCharge = { id: query.chargeId } as SchoolCharge;
        factura.schoolChargePayment = { id: query.chargePaymentId } as SchoolChargePayment;
        factura.invoiceBranchOffice = { id: query.branchOfficeId } as BranchOffice;
        factura.invoiceBranchOfficeSet = { id: query.branchOfficeSettingId } as BranchOfficeSetting;
        invoiceRecord = await this.schoolChargeInvoiceService.saveInvoice(factura);
      }

      // ── 4. Preparar datos para el timbrado ──
      const receptor = {
        Nombre: query.receiver.businessName,
        Rfc: query.receiver.rfc,
        UsoCFDI: query.usoCfdi.value as UsoCfdiEnum,
        DomicilioFiscalReceptor: query.receiver.domicilioFiscalReceptor,
        RegimenFiscalReceptor: query.receiver.keyRegimen as RegimenFiscalEnum,
      };

      const studentMetada = await this.studentsService.getIEDUMetadata(query.student.id);
      const student = {
        rfcPago: query.receiver.rfc,
        version: studentMetada.version,
        nombreAlumno: studentMetada.nombreAlumno,
        nivelEducativo: studentMetada.nivelEducativo,
        CURP: studentMetada.CURP,
        autRVOE: studentMetada.RVOE,
      };

      const env: Environment = {
        instancePath: this.configService.getPath(),
        xslt: this.configService.getXsltPath(),
      };

      // ── 5. Timbrar (CRÍTICO — si falla, lanza excepción) ──
      const fullResult: FullGenerateResult = await GenerateInvoiceMunyaal({
        type: InvoiceModules.SCHOOL,
        ...invoiceDetails,
        folio: invoiceRecord.folio,
        serie: branchOfficeSett.serieFacturacion,
        emisor: branchOfficeSett,
        env,
        informacionGlobal: query.informacionGlobal,
        receptor,
        codigoFormaPago: result.highestPayment.codePaymentMethod as FormaPagoEnum,
        TipoDeComprobante: TipoComprobanteEnum.I,
        Exportacion: ExportacionEnumMunyaal.E01,
        MetodoPago: MetodoPagoEnum.PUE,
        Moneda: MonedaEnum.MXN,
        student,
        related: query.related,
        s3Service: this.s3Service,
      });

      // Si llegó aquí sin throw → timbrado + XML guardado exitosamente
      response.warnings.push(...fullResult.warnings);

      // ── 6. Actualizar estados en BD (CRÍTICO con recuperación) ──
      try {
        await this.updatePayment({
          id: query.chargePaymentId,
          stamping: 1,
        } as SchoolChargePayment);

        invoiceRecord.uuid = fullResult.uuid;
        invoiceRecord.status = 1;
        invoiceRecord.total = parseFloat(fullResult.total);

        const updatedInvoice = await this.schoolChargeInvoiceService.updateInvoice(invoiceRecord);
        response.statusUpdated = true;
        response.invoice = updatedInvoice;
      } catch (err) {
        // El timbrado fue exitoso pero la BD falló → guardar UUID pendiente
        await this.savePendingStamp(invoiceRecord.id, fullResult.uuid);
        response.warnings.push({
          step: 'db-update',
          message: `Timbrado exitoso pero error al actualizar BD: ${err.message}`,
          stack: err.stack,
        });
        response.invoice = invoiceRecord;
      }

      // ── 7. Enviar correo (NO CRÍTICO) ──
      try {
        await this.schoolChargeInvoiceService.sendMail(
          currentOffice,
          fullResult.uuid,
          query.receiver.email,
        );
        response.emailSent = true;
      } catch (err) {
        response.warnings.push({
          step: 'email',
          message: `Error al enviar correo: ${err.message}`,
          stack: err.stack,
        });
      }

      response.stamping = true;
      response.msg = 'Pago Facturado';
      response.uuid = fullResult.uuid;

      return response;
    }

    /**
     * Orquestador del proceso de facturación global.
     */
    async processGlobalBilling(query: any): Promise<GlobalBillingResponse> {
      const concepts = await this.service.notInvoiced(query);

      if (!concepts.length) {
        throw new NotFoundException('Concepts not exists');
      }

      const details = getDetailsPaymentsGlobal(
        concepts,
        ObjetoImpEnum.OI01,
        0,
      );

      const wayPayment = await this.service.getWayPayment(concepts);
      const branchOffice = await this.branchOfficeService.findBranch(query.branchOfficeId);
      const branchOfficeConfig = await this.branchOfficeSettingService.findOne({
        where: { id: query.branchOfficeId },
      });

      let invoice = await this.service.getGlobalInvoice(branchOffice, branchOfficeConfig);

      const fullResult = await GenerateGlobalInvoiceMunyaal({
        branchOfficeConfig,
        wayPayment,
        details,
        env: {
          instancePath: this.configService.getPath(),
          xslt: this.configService.getXsltPath(),
        },
        folio: invoice.folio,
        infoGlobal: {
          periodicity: query.periodicity,
          month: query.month,
          year: query.year,
        },
        percentageTax: '0',
        type: InvoiceModules.SCHOOL,
        TipoDeComprobante: TipoComprobanteEnum.I,
        Exportacion: ExportacionEnumMunyaal.E01,
        MetodoPago: MetodoPagoEnum.PUE,
        Moneda: MonedaEnum.MXN,
        s3Service: this.s3Service,
      });

      const warnings = [...fullResult.warnings];
      let statusUpdated = false;

      try {
        await this.updateStampingPayments(
          concepts.map((value: any) => value.p_id),
          fullResult.uuid,
        );

        invoice.uuid = fullResult.uuid;
        invoice.status = 1;
        invoice.total = parseFloat(fullResult.total);
        invoice = await this.schoolChargeInvoiceService.updateInvoice(invoice);
        statusUpdated = true;
      } catch (err) {
        await this.savePendingStamp(invoice.id, fullResult.uuid);
        warnings.push({
          step: 'db-update',
          message: `Timbrado global exitoso pero error al actualizar BD: ${err.message}`,
          stack: err.stack,
        });
      }

      let emailSent = false;
      try {
        await this.schoolChargeInvoiceService.sendMail(
          branchOffice,
          fullResult.uuid,
          branchOfficeConfig.email,
        );
        emailSent = true;
      } catch (err) {
        warnings.push({
          step: 'email',
          message: `Error al enviar correo: ${err.message}`,
          stack: err.stack,
        });
      }

      return {
        uuid: fullResult.uuid,
        invoice,
        stamping: fullResult.stamped,
        concepts,
        msg: 'Factura global timbrada',
        statusUpdated,
        emailSent,
        warnings,
      };
    }
}
