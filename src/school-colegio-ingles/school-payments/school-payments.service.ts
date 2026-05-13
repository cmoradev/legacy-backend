import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { SchoolPayment } from './entities/school-payment.entity';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Connection, In, Repository } from 'typeorm';
import { IQueryReport, IQueryReportConcept } from './interfaces/IQueryReport';
import * as moment from 'moment';
import { IReportConceptRow } from './interfaces/IReportConceptRow.interface';
import { PaymentStatus } from '../../common/enums/PaymentStatus';
import { AssignMiniStorePaymentDto } from './dto/assign-mini-store-payment.dto';
import { MiniStoreSale } from '../../mini-store/store-sales/mini-store-sales/entities/mini-store-sale.entity';
import { MiniStoreSalePayment } from '../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { SchoolChargeDetails } from '../charges-school/school-charges-details/entities/school-charge-details.entity';
import { SchoolCharge } from '../charges-school/school-charges/entities/school-charge.entity';
import { saleDetailsCalculations } from '../../common/utils/report/sales.calculation';
import { InvoiceModules } from '../../common/point-of-sale/types.pos';
import { Decimal } from '@munyaal/calculations';
import { groupBy } from '../../common/functions';

@Injectable()
export class SchoolPaymentsService extends TypeOrmCrudService<SchoolPayment> {
  constructor(
    @InjectConnection(ColegioDBNameConnection)
    private connection: Connection,
    @InjectRepository(SchoolPayment, ColegioDBNameConnection)
    public repo: Repository<SchoolPayment>,
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

  public async paymentsByStatus(options: IQueryReport) {
    const payments = await this.repo
      .createQueryBuilder('schoolPayments')
      .leftJoinAndSelect('schoolPayments.inscription', 'inscription')
      .leftJoinAndSelect('inscription.inscripStudent', 'inscripStudent')
      .leftJoinAndSelect('inscription.inscripLevel', 'inscripLevel')
      .leftJoinAndSelect('inscription.inscripGrade', 'inscripGrade')
      .leftJoinAndSelect('inscription.inscripCycle', 'inscripCycle')
      .leftJoinAndSelect('inscription.inscripClassroom', 'inscripClassroom')
      .leftJoinAndSelect('inscription.inscripCampus', 'branchOffice')
      .where('schoolPayments.isActive = :isActive', { isActive: true })
      .andWhere('inscription.idStatus != \'0\'')
      .andWhere('inscripStudent.statusStudent != \'0\'');
    if (
      options.month !== null &&
      options.month !== '' &&
      typeof options.month !== 'undefined'
    ) {
      payments.andWhere(
        'schoolPayments.payDate BETWEEN :startDate AND :endDate',
        {
          startDate: moment(options.month).startOf('month').toDate(),
          endDate: moment(options.month).endOf('month').toDate(),
        },
      );
    }
    if (
      parseInt(`${options.statusPayment}`) !== 0 &&
      `${options.statusPayment}` !== '0' &&
      typeof options.statusPayment !== 'undefined'
    )
      payments.andWhere('schoolPayments.statusPayment = :statusPayment', {
        statusPayment: options.statusPayment,
      });
    if (
      options.cycleId !== 0 &&
      options.cycleId !== '0' &&
      typeof options.cycleId !== 'undefined'
    )
      payments.andWhere('inscripCycle.id = :cycleId', {
        cycleId: options.cycleId,
      });
    if (
      options.branchOfficeId !== 0 &&
      options.branchOfficeId !== '0' &&
      typeof options.branchOfficeId !== 'undefined'
    )
      payments.andWhere('branchOffice.id = :branchOfficeId', {
        branchOfficeId: options.branchOfficeId,
      });
    if (
      options.levelId !== 0 &&
      options.levelId !== '0' &&
      typeof options.levelId !== 'undefined'
    )
      payments.andWhere('inscripLevel.id = :levelId', {
        levelId: options.levelId,
      });
    if (
      options.gradeId !== 0 &&
      options.gradeId !== '0' &&
      typeof options.gradeId !== 'undefined'
    )
      payments.andWhere('inscripGrade.id = :gradeId', {
        gradeId: options.gradeId,
      });
    await payments.addOrderBy('schoolPayments.statusPayment');
    return payments.getMany();
  }

  public async reportConceptsUpToDate({
    conceptPay,
    cycleId,
    conceptStatus,
    branchOfficeId
  }: IQueryReportConcept): Promise<IReportConceptRow[]> {
    let queryString = `SELECT * FROM vw_status_concepts WHERE conceptPay <= '${conceptPay}' AND cycleId = ${cycleId} AND branchOfficeId = ${branchOfficeId}`;

    if (`${conceptStatus}` === `${PaymentStatus.Debit}`) {
      queryString = `${queryString} AND conceptStatus = ${conceptStatus} AND conceptPaid IS NULL AND inscriptionStatus != '0' AND studentStatus != '0';`;
    } else if (`${conceptStatus}` === `${PaymentStatus.PaiOut}`) {
      queryString = `${queryString} AND (conceptStatus = ${conceptStatus} OR conceptPaid IS NOT NULL);`;
    } else {
      queryString = `${queryString} AND conceptStatus = ${conceptStatus};`;
    }

    try {
      return this.connection.query(queryString);
    } catch (e) {
      throw new NotFoundException(
        `Error in query or conection [${queryString}]`,
      );
    }
  }

  public async assignMiniStorePayment(payload: AssignMiniStorePaymentDto) {
    const {
      miniStoreSaleId,
      miniStorePaymentId,
      miniStorePaymentTotal,
      schoolPaymentIds,
    } = payload;

    if (!schoolPaymentIds || schoolPaymentIds.length === 0) {
      throw new BadRequestException('El arreglo de schoolPaymentIds está vacío');
    }

    return await this.connection.transaction(async (manager) => {

      const sale = await manager.findOne(MiniStoreSale, {
        where: { id: miniStoreSaleId },
      });

      if (!sale) {
        throw new NotFoundException(
          `Venta tienda ${miniStoreSaleId} no encontrada`,
        );
      }

      const payment = await manager.findOne(MiniStoreSalePayment, {
        where: { id: miniStorePaymentId },
        relations: ['miniStoreSale'],
      });

      if (!payment) {
        throw new NotFoundException(
          `Pago tienda ${miniStorePaymentId} no encontrado`,
        );
      }

      if (!payment.miniStoreSale || payment.miniStoreSale.id !== miniStoreSaleId) {
        throw new BadRequestException(
          `El pago ${miniStorePaymentId} no pertenece a la venta ${miniStoreSaleId}`,
        );
      }

      const schoolPayments = await manager.find(SchoolPayment, {
        where: { id: In(schoolPaymentIds) },
        relations: [
          'extraCharges',
          'schoolChargeDetail',
          'schoolChargeDetail.extraCharges',
          'schoolChargeDetail.schoolCharge',
        ],
      });

      if (schoolPayments.length !== schoolPaymentIds.length) {
        const foundIds = schoolPayments.map((p) => p.id);
        const missingIds = schoolPaymentIds.filter(
          (id) => !foundIds.includes(id),
        );
        throw new NotFoundException(
          `SchoolPayments no encontrados: ${missingIds.join(', ')}`,
        );
      }

      const invalidStatusIds = schoolPayments
        .filter((paymentItem) =>
          [PaymentStatus.Cancelled, PaymentStatus.Condoned].includes(
            paymentItem.statusPayment,
          ),
        )
        .map((paymentItem) => paymentItem.id);

      if (invalidStatusIds.length > 0) {
        throw new BadRequestException(
          `SchoolPayments con estado inválido: ${invalidStatusIds.join(', ')}`,
        );
      }

      let availableAmount = Decimal.max(
        Decimal.abs(miniStorePaymentTotal || 0),
        0,
      ).toNumber();

      const response: {
        id: number;
        previousStatus: PaymentStatus;
        currentStatus: PaymentStatus;
        ministoreSale: string | null;
        ministorePayment: string | null;
        appliedAmount: number;
        schoolChargeId: number;
      }[] = [];

      const ignoredIds = schoolPayments
        .filter(
          (paymentItem) =>
            ![PaymentStatus.Abonar, PaymentStatus.Debit].includes(
              paymentItem.statusPayment,
            ),
        )
        .map((paymentItem) => paymentItem.id);

      const relatedDetails = await manager.find(SchoolChargeDetails, {
        where: { schoolPlanPayment: { id: In(schoolPaymentIds) } },
        relations: ['schoolCharge', 'schoolPlanPayment'],
      });

      /** AGRUPAR DETALLES POR ID DE VENTA */
      const detailsByChargeId = groupBy<SchoolChargeDetails>(relatedDetails, (detail) => `${detail.schoolCharge?.id || 0}`);

      const chargeIds = Object.keys(detailsByChargeId)
        .map((id) => Number(id))
        .filter((id) => !Number.isNaN(id));

      if (chargeIds.length === 0) {
        throw new BadRequestException(
          'No se encontraron ventas de colegio relacionadas a los schoolPayments',
        );
      }

      const charges = await manager.find(SchoolCharge, {
        where: { id: In(chargeIds) },
        relations: ['chargesDetails', 'chargesDetails.extraCharges', 'chargesPayments'],
      });

      /** DICCIONARIO DE VENTAS */
      const chargeMap = new Map<number, SchoolCharge>();
      
      charges.forEach((charge) => chargeMap.set(charge.id, charge));

      /** DICCIONARIO DE PAGOS */
      const schoolPaymentById = new Map(
        schoolPayments.map((paymentItem) => [paymentItem.id, paymentItem]),
      );

      const paymentIdsByChargeId = new Map<number, number[]>();

      relatedDetails.forEach((detail) => {
        const chargeId = detail.schoolCharge?.id;
        const paymentId = detail.schoolPlanPayment?.id;
        
        if (!chargeId || !paymentId || !schoolPaymentById.has(paymentId)) return;
        
        const list = paymentIdsByChargeId.get(chargeId) || [];
        
        if (!list.includes(paymentId)) list.push(paymentId);
        
        paymentIdsByChargeId.set(chargeId, list);
      });

      const chargeGroups = chargeIds.map((chargeId) => {
        const paymentIds = paymentIdsByChargeId.get(chargeId) || [];
        const payments = paymentIds
          .map((id) => schoolPaymentById.get(id))
          .filter((item) => !!item) as SchoolPayment[];

        const hasAbonar = payments.some(
          (paymentItem) => paymentItem.statusPayment === PaymentStatus.Abonar,
        );

        return {
          chargeId,
          payments,
          priority: hasAbonar ? 0 : 1,
        };
      });

      chargeGroups.sort((a, b) => {
        if (a.priority !== b.priority) return a.priority - b.priority;
        return a.chargeId - b.chargeId;
      });


      for (const group of chargeGroups) {
        const charge = chargeMap.get(group.chargeId);

        if (!charge) {
          continue;
        }

        const totalVentaColegio = saleDetailsCalculations({
          details: charge.chargesDetails,
          type: InvoiceModules.SCHOOL,
        }).total || 0;

        const totalPagosColegio = charge.chargesPayments
          .filter((paymentItem) => paymentItem.paymentStatus === PaymentStatus.PaiOut)
          .reduce(
            (acc, paymentItem) =>
              Decimal.sum(
                acc,
                Decimal.sub(paymentItem.quantity || 0, paymentItem.change || 0),
              ).toNumber(),
            0,
          );
        
        const ministorePaymentIds = Array.from(
          new Set(
            [].concat(
              ...group.payments.map((paymentItem) =>
                this.parseCsvIds(paymentItem.ministorePayment),
              ),
            ),
          ),
        ).filter((id) => id !== miniStorePaymentId);

        let totalPagosMiniStoreRelacionados = 0;

        if (ministorePaymentIds.length > 0) {
          const ministorePayments = await manager.find(MiniStoreSalePayment, {
            where: { id: In(ministorePaymentIds) },
          });

          totalPagosMiniStoreRelacionados = ministorePayments
            .filter(
              (paymentItem) => paymentItem.paymentStatus === PaymentStatus.PaiOut,
            )
            .reduce(
              (acc, paymentItem) =>
                Decimal.sum(
                  acc,
                  Decimal.sub(paymentItem.quantity || 0, paymentItem.change || 0),
                ).toNumber(),
              0,
            );
        }

        const faltanteAntesDelPagoActual = Decimal.sub(
          totalVentaColegio,
          Decimal.sum(totalPagosColegio, totalPagosMiniStoreRelacionados),
        ).toNumber();

        const montoNecesarioDeLaBolsa =
          faltanteAntesDelPagoActual > 0 ? faltanteAntesDelPagoActual : 0;

        const shouldPayOut = availableAmount >= montoNecesarioDeLaBolsa;
        const appliedAmount = shouldPayOut ? montoNecesarioDeLaBolsa : 0;

        if (shouldPayOut) {
          availableAmount = Decimal.sub(availableAmount, appliedAmount).toNumber();
        }

        for (const schoolPayment of group.payments) {
          const updatedMinistoreSale = this.appendUniqueCsv(
            schoolPayment.ministoreSale,
            miniStoreSaleId,
          );
          const updatedMinistorePayment = this.appendUniqueCsv(
            schoolPayment.ministorePayment,
            miniStorePaymentId,
          );

          const newStatus = shouldPayOut
            ? PaymentStatus.PaiOut
            : PaymentStatus.Abonar;

          await manager.update(
            SchoolPayment,
            { id: schoolPayment.id },
            {
              statusPayment: newStatus,
              paidDate:
                newStatus === PaymentStatus.PaiOut
                  ? new Date()
                  : schoolPayment.paidDate || null,
              ministoreSale: updatedMinistoreSale,
              ministorePayment: updatedMinistorePayment,
            },
          );

          response.push({
            id: schoolPayment.id,
            previousStatus: schoolPayment.statusPayment,
            currentStatus: newStatus,
            ministoreSale: updatedMinistoreSale,
            ministorePayment: updatedMinistorePayment,
            appliedAmount,
            schoolChargeId: group.chargeId,
          });
        }
      }

      const result = {
        miniStoreSaleId,
        miniStorePaymentId,
        initialAmount: miniStorePaymentTotal,
        remainingAmount: availableAmount,
        updated: response,
        ignoredIds,
      };

      return result;
    });
  }

  public async toggleActiveByIds(ids: number[]) {
    if (!ids || ids.length === 0) {
      throw new BadRequestException('El arreglo de schoolPaymentIds está vacío');
    }

    return await this.connection.transaction(async (manager) => {
      const schoolPayments = await manager.find(SchoolPayment, {
        where: { id: In(ids) },
        select: ['id', 'isActive'],
      });

      const foundIds = schoolPayments.map((payment) => payment.id);
      const missingIds = ids.filter((id) => !foundIds.includes(id));

      if (foundIds.length > 0) {
        await manager
          .createQueryBuilder()
          .update(SchoolPayment)
          .set({ isActive: () => 'NOT isActive' })
          .whereInIds(foundIds)
          .execute();
      }

      const updated = schoolPayments.map((payment) => ({
        id: payment.id,
        previousIsActive: payment.isActive,
        currentIsActive: !payment.isActive,
      }));

      return {
        updated,
        missingIds,
      };
    });
  }

  private appendUniqueCsv(currentValue: string | null, id: number) {
    const nextValue = `${id}`;
    const existing = (currentValue || '')
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (!existing.includes(nextValue)) {
      existing.push(nextValue);
    }

    return existing.join(',');
  }

  private parseCsvIds(currentValue: string | null) {
    const ids = (currentValue || '')
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .map((item) => Number(item))
      .filter((item) => !Number.isNaN(item));

    return Array.from(new Set(ids));
  }
}
