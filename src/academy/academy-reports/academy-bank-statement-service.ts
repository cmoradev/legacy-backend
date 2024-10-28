import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { AcademyBankStatementQuery } from './dto';
import { format } from 'date-fns';
import { PaymentStatus } from '../../common/enums/PaymentStatus';
import { NotFoundException } from '@nestjs/common';
import {
  groupBy,
  getMonthsBetweenDate,
  MonthDate,
} from '../../common/functions';
import { IAcademyReportConceptDetailsRow, IAcademyReportConceptRow } from '../academy-inscription-concepts/interfaces/IQueryReport';
import { auxIAcademyReportConceptRow, baseAcademyBankStatement, ChargeDetailsRow, groupByMonth } from './types';
import { SystemTypeExtraChargesEnum } from 'src/system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { calculateInvoicePrices, ChargeApplicationEnum, ChargeTypeEnum, Concept, FountTypeEnum } from '@munyaal/calculations';
import { TypeChargeApplicationEnum } from 'src/system/system-extra-charges/enums/system-extra-charges.enum';

export class AcademyBankStatementService {
  constructor(
    @InjectConnection(ColegioDBNameConnection) private connection: Connection,
  ) {}

  /**
   * Obtiene los datos de ingresos por academias.
   * @param query - Consulta de ingresos por academias.
   * @returns Un objeto que contiene las filas de ingresos y la matriz de resumen.
   */
  public async academyBankStatement(query: AcademyBankStatementQuery) {
    
    const result = await this.getDetailsConcept(query);

    const conceptIDs = result.map((row) => row.conceptId);
    // Obtenego cargos aplicados en los conceptos
    const charges = await this.getChargesOfDetails(conceptIDs);

    const concepts = this.recalculateConceptsWithCharges(result, charges);

    const conceptsByMonth = this.groupByMonth(concepts);

    const months = getMonthsBetweenDate(
      query.startDate,
      query.endDate
    );

    const matriz = this.getMatriz(
      months,
      conceptsByMonth.academies,
      conceptsByMonth.dataWithMonth.sort(
        (a, b) =>
          new Date(a.yearAndMonth).getTime() -
          new Date(b.yearAndMonth).getTime(),
      ),
    );

    return {
      rows: { ...conceptsByMonth, months },
      matriz,
    };
  }

  /**
   * Obtiene los detalles de ventas de un alumno entre un rango de fechas y un estado especifico (opcional).
   * @param query - Consulta de ingresos por academias/mes del alumno.
   * @returns Una lista de detalles de ingresos.
   */
  private async getDetailsConcept(
    query: AcademyBankStatementQuery,
  ): Promise<IAcademyReportConceptRow[]> {
    const conceptStatus = query.paymentStatus
      ? parseInt(`${query.paymentStatus}`)
      : undefined;

    const startDate = query.startDate;

    const endDate = query.endDate;

    let queryString = `SELECT * FROM vw_aca_status_concepts WHERE studentId = ${query.studentId}`;

    if (typeof conceptStatus !== 'undefined') {
      if (`${conceptStatus}` === `${PaymentStatus.Debit}`) {
        queryString = `${queryString} AND conceptStatus = ${conceptStatus} AND conceptPaid IS NULL`;
      } else if (`${conceptStatus}` === `${PaymentStatus.PaiOut}`) {
        queryString = `${queryString} AND (conceptStatus = ${conceptStatus} OR conceptPaid IS NOT NULL)`;
      } else {
        queryString = `${queryString} AND conceptStatus = ${conceptStatus}`;
      }
    }

    queryString = `${queryString} AND conceptPay BETWEEN '${startDate}' AND '${endDate}' AND inscriptionStatus = '2';`;

    try {
      return this.connection.query(queryString);
    } catch (e) {
      throw new NotFoundException(
        `Error in query or conection [${queryString}]`,
      );
    }
  }

  /**
   * Obtiene agrupaciones de los datos por fecha y  academia
   * @param data - Consulta de los conceptos sin tratar.
   * @returns listado de los datos agrupados por fecha y academia.
   */
  public groupByMonth(data: IAcademyReportConceptRow[]): groupByMonth {
    const dataWithMonth = data
      .map((value: auxIAcademyReportConceptRow) => ({
        ...value,
        yearAndMonth: format(value.conceptPay, 'yyyy-MM'),
      }))
      .sort(
        (a, b) =>
          new Date(`${a.conceptPay}`).getTime() -
          new Date(`${b.conceptPay}`).getTime(),
      );

    const academies = this.getUniqueAcademyIds(dataWithMonth);

    const dataGroupByMount = groupBy(
      dataWithMonth,
      (value) => value.yearAndMonth,
    );

    const dataGroupByAcademy = groupBy(
      dataWithMonth,
      (value) => value.academyId.toString(),
    );

    const groupByMountKey = Object.keys(dataGroupByMount);

    const dataGroupByMountAndAcademy = {};

    for (let i = 0; i < groupByMountKey.length; i++) {
      const id = `${groupByMountKey[i]}`;
      const groupByAcademy = groupBy(
        dataGroupByMount[id],
        (value) => `${value.academyId}`,
      );

      dataGroupByMountAndAcademy[id] = {
        ...groupByAcademy,
      };
    }

    return {
      academies,
      dataWithMonth,
      dataGroupByAcademy,
      dataGroupByMount,
      dataGroupByMountAndAcademy,
    };
  }

  /**
   * Obtiene la matriz de totales de los conceptos.
   * @param months - Listado de los meses consultados.
   * @param academies - Listado de academias de los conceptos consultados, sin duplicar.
   * @param dataWithMonth - Listado de los conceptos con el mes y año correspondiente.
   * @returns Una matriz con los totales por academia y mes .
   */
  private getMatriz(
    months: MonthDate[],
    academies: baseAcademyBankStatement[],
    dataWithMonth: auxIAcademyReportConceptRow[],
  ) {
    const resumeDataTable = [
      [
        'Academia',
        ...months.map((value) => `${value.name} - ${value.year}`),
        'Total',
      ],
    ];

    const header = [...academies, { name: 'Totales', id: 0 }];
    for (const academy of header) {
      const resumeDataTableItem: any[] = [academy.name];

      for (const month of months) {

        let total = 0;

        let filtered = [];

        if (academy.id != 0) {
          const filteredResume = dataWithMonth.filter(
            (value) =>
              value.yearAndMonth === month.date &&
              value.academyId === academy.id,
          );

          filtered = filteredResume;
        } else {
          const filteredTotalMonth = dataWithMonth.filter(
            (value) => value.yearAndMonth === month.date,
          );

          filtered = filteredTotalMonth;
        }

        total = filtered
          ? filtered.reduce((previousValue, currentValue) => {
              return (
                previousValue + parseFloat(currentValue.amountWithCharges)
              );
            }, 0)
          : 0;

        resumeDataTableItem.push(total);
      }

      resumeDataTableItem.push(
        resumeDataTableItem.reduce((previousValue, currentValue) => {
          let amount = 0;
          if (!isNaN(+currentValue)) {
            amount = +currentValue;
          }
          return previousValue + amount;
        }, 0),
      );

      resumeDataTable.push(resumeDataTableItem);
    }

    return resumeDataTable;
  }

  /**
   * Obtiene un listado de las academias sin repetir.
   * @param data - Consulta de los conceptos sin tratar.
   * @returns Una lista unica de academias.
   */
  public getUniqueAcademyIds(data: IAcademyReportConceptRow[]) {
    const seenAcademyIds = new Set<number>(); // Array de academyId sin repetir

    return data
      .filter((item) => {
        if (!seenAcademyIds.has(item.academyId)) {
          seenAcademyIds.add(item.academyId); // Agrega el academyId al conjunto si aún no está presente
          return true; // Incluye este item en el nuevo array
        } else {
        }
        return false; // Si el academyId ya fue visto, lo excluye
      })
      .map((value) => ({ id: value.academyId, name: value.academyName }));
  }

  /**
   * Obtiene los cargos aplicados en los conceptos/detalles de venta
   * @param ids - Lista de IDs de conceptos/detalles de venta.
   * @returns Una lista de detalles de cargos aplicados.
   */
  public async getChargesOfDetails(
    ids: number[],
  ): Promise<ChargeDetailsRow[]> {
    if (!!ids.length) {
      const params = ids.map((id) => `?`).join(',');

      const query = `
      SELECT 
        c.id              as id,
        c.name            as description,
        c.quantity        as quantity,
        c.applicationType as applcation,
        c.operationType   as operation,
        c.typeExtraCharge as internalType,
        c.inscChargeDetailId  as id_detalle
      FROM ac_inscrip_concepts_extra_charges c
  
      WHERE c.inscChargeDetailId IN (${[params]});`;

      const rows: any[] = await this.connection.query(query, ids);

      return rows.map((row) => {
        let order = 0;

        if (row.internalType == SystemTypeExtraChargesEnum.Becas) {
          order = 1;
        } else if (row.internalType == SystemTypeExtraChargesEnum.Descuentos) {
          order = 2;
        } else if (row.internalType == SystemTypeExtraChargesEnum.Recargos) {
          order = 3;
        }

        return {
          ...row,
          id: parseInt(`${row.id}`),
          quantity: parseFloat(`${row.quantity}`),
          id_detalle: parseInt(`${row.id_detalle}`),
          type:
            row.internalType == SystemTypeExtraChargesEnum.Recargos
              ? ChargeTypeEnum.SURCHARGES
              : ChargeTypeEnum.DISCOUNTS,
          applcation:
            row.applcation == TypeChargeApplicationEnum.percentage
              ? ChargeApplicationEnum.PERCENTAGE
              : ChargeApplicationEnum.QUANTITY,
          order,
        };
      });
    }
    return [];
  }

  public recalculateConceptsWithCharges(
    concepts: IAcademyReportConceptRow[],
    charges: ChargeDetailsRow[],
  ): IAcademyReportConceptRow[] {
    const rows: IAcademyReportConceptRow[] = [];

    // Agrupo los conceptos por venta
    const sales = concepts.reduce((acc, row) => {
      if (!acc[`${row.conceptId}`]) {
        acc[`${row.conceptId}`] = [row];
      } else {
        acc[`${row.conceptId}`]?.push(row);
      }
      return acc;
    }, {});

    // Por cada venta se recalculan los cargos aplicados segun lo cobrado
    for (const saleID in sales) {
      if (Object.prototype.hasOwnProperty.call(sales, saleID)) {
        const details = sales[`${saleID}`];

        const { detailsWithoutPaymentApplied } = calculateInvoicePrices({
          fountType: FountTypeEnum.DISCOUNT_ON_DISCOUNT,
          ivaPercentage: 0.16,
          concepts: details.map(
            (detail): Concept<IAcademyReportConceptRow> => {
              const chargesApplied = charges.filter(
                (charge) => charge.id_detalle === detail.conceptId,
              );

              return {
                id: detail.conceptId,
                name: detail.conceptName,
                charges: chargesApplied.map((charge) => ({
                  amount: charge.quantity,
                  application: charge.applcation,
                  type: charge.type,
                  order: charge.order,
                })),
                quantity: 1,
                basePrice: detail.conceptPrice,
                data: detail,
              };
            },
          ),
          payment: {
            amount: 0,
            change: 0,
          },
        });

        const concepts: IAcademyReportConceptDetailsRow[] = detailsWithoutPaymentApplied.concepts.map(
          (concept) => ({
            ...concept.data,
            amountWithCharges: concept.amountWithCharges.toNumber(),
            amountWithoutCharges: concept.amountWithoutCharges.toNumber(),
            discount: concept.discountWithIVA.toNumber(),
            surcharge: concept.chargeWithIVA.toNumber(),
          }),
        );

        rows.push(...concepts);
      }
    }

    return rows;
  }
  
}
