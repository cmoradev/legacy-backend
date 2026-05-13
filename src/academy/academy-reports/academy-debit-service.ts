import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { AcademyDebitQuery } from './dto';
import { startOfDay, endOfDay } from 'date-fns';
import { PaymentStatus } from '../../common/enums/PaymentStatus';
import { NotFoundException } from '@nestjs/common';
import { IAcademyReportConceptRow } from '../academy-inscription-concepts/interfaces/IQueryReport';
import { AcademyBankStatementService } from './academy-bank-statement-service';
import { ExcelDocument } from '../../reports/excel.document';
import * as moment from 'moment';
import { TableColumnProperties } from 'exceljs';
import { ChargeApplicationEnum, ChargeTypeEnum } from '@munyaal/calculations';
import {
  auxIAcademyReportConceptRow,
  ChargeDetailsRow,
  SummaryRow,
} from './types';
import { SystemTypeExtraChargesEnum } from '../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import {
  ApplicationFormEnum,
  TypeChargeApplicationEnum,
} from '../../system/system-extra-charges/enums/system-extra-charges.enum';
const esMx = require('moment/locale/es-mx');

export class AcademyDebitService {
  constructor(
    @InjectConnection(ColegioDBNameConnection) private connection: Connection,
    private readonly academyBankStatementService: AcademyBankStatementService,
  ) {}

  /**
   * Obtiene los datos de ingresos por academias.
   * @param query - Consulta de ingresos por academias.
   * @returns Un objeto que contiene las filas de ingresos y la matriz de resumen.
   */
  public async academyDebit(query: AcademyDebitQuery) {
    const result = await this.getDebitDetailsConcept(query);

    const conceptIDs = result.map((row) => row.conceptId);

    const [chargesFromDetails, automaticCharges] = await Promise.all([
      this.academyBankStatementService.getChargesOfDetails(conceptIDs),
      this.getAutomaticChargesOfDetails(conceptIDs),
    ]);

    const charges = [...chargesFromDetails, ...automaticCharges];

    const concepts = this.academyBankStatementService.recalculateConceptsWithCharges(
      result,
      charges,
    );

    const conceptsByMonth = this.academyBankStatementService.groupByMonth(
      concepts,
    );

    const matriz = this.getMatriz(conceptsByMonth.dataWithMonth);

    return {
      rows: { ...conceptsByMonth, months: [] },
      matriz,
    };
  }

  private async getAutomaticChargesOfDetails(
    ids: number[],
  ): Promise<ChargeDetailsRow[]> {
    if (!ids.length) {
      return [];
    }

    const automaticType = Number(ApplicationFormEnum.Automatic);

    const formTypes = automaticType === 3 ? [3] : [automaticType, 3];

    const placeholders = formTypes.map(() => '?').join(',');

    const query = `
      SELECT
        c.id                 as id,
        c.nombre             as description,
        c.porcentaje         as quantity,
        c.typeApplication    as applcation,
        c.operation          as operation,
        c.id_tipo_descuento  as internalType
      FROM ac_descuentos c
      WHERE c.id_formaplicacion IN (${placeholders});
    `;

    const automaticCharges: any[] = await this.connection.query(
      query,
      formTypes,
    );
    console.log(automaticCharges)

    const uniqueIds = [...new Set(ids)];
    const mappedCharges: ChargeDetailsRow[] = [];

    uniqueIds.forEach((detailId) => {
      automaticCharges.forEach((row) => {
        let order = 0;

        if (row.internalType == SystemTypeExtraChargesEnum.Becas) {
          order = 1;
        } else if (row.internalType == SystemTypeExtraChargesEnum.Descuentos) {
          order = 2;
        } else if (row.internalType == SystemTypeExtraChargesEnum.Recargos) {
          order = 3;
        }

        mappedCharges.push({
          id: parseInt(`${row.id}`),
          description: row.description,
          quantity: parseFloat(`${row.quantity}`),
          applcation:
            row.applcation == TypeChargeApplicationEnum.percentage
              ? ChargeApplicationEnum.PERCENTAGE
              : ChargeApplicationEnum.QUANTITY,
          operation: row.operation,
          internalType: row.internalType,
          id_detalle: detailId,
          type:
            row.internalType == SystemTypeExtraChargesEnum.Recargos
              ? ChargeTypeEnum.SURCHARGES
              : ChargeTypeEnum.DISCOUNTS,
          order,
        });
      });
    });

    return mappedCharges;
  }

  /**
   * Obtiene los detalles de ventas entre un rango de fechas y un estado especifico (opcional).
   * @param query - Consulta de ingresos por academias/mes
   * @returns Una lista de detalles de ingresos.
   */
  private async getDebitDetailsConcept(
    query: AcademyDebitQuery,
  ): Promise<IAcademyReportConceptRow[]> {
    const conceptStatus = query.paymentStatus
      ? parseInt(`${query.paymentStatus}`)
      : undefined;

    const startDate = startOfDay(query.startDate).toISOString();

    const endDate = endOfDay(query.endDate).toISOString();

    let queryString = `SELECT * FROM vw_aca_status_concepts WHERE inscriptionStatus = '2'`;

    if (typeof conceptStatus !== 'undefined') {
      if (`${conceptStatus}` === `${PaymentStatus.Debit}`) {
        queryString = `${queryString} AND conceptStatus = ${conceptStatus} AND conceptPaid IS NULL`;
      } else if (`${conceptStatus}` === `${PaymentStatus.PaiOut}`) {
        queryString = `${queryString} AND (conceptStatus = ${conceptStatus} OR conceptPaid IS NOT NULL)`;
      } else {
        queryString = `${queryString} AND conceptStatus = ${conceptStatus}`;
      }
    }

    queryString = `${queryString} AND conceptPay BETWEEN '${startDate}' AND '${endDate}';`;
    console.log(queryString);
    try {
      return this.connection.query(queryString);
    } catch (e) {
      throw new NotFoundException(
        `Error in query or conection [${queryString}]`,
      );
    }
  }

  public async buildDocument(
    matriz: string[][],
    rows: auxIAcademyReportConceptRow[],
  ) {
    const excel = new ExcelDocument();

    const worksheet = excel.addWorksheet('Adeudos academias');

    worksheet.columns = [
      { key: 'A', width: 10 },
      { key: 'B', width: 30 },
      { key: 'C', width: 20 },
      { key: 'D', width: 20 },
      { key: 'E', width: 20 },
      { key: 'F', width: 45 },
      { key: 'G', width: 45 },
      { key: 'H', width: 20 },
      { key: 'I', width: 20 },
      { key: 'J', width: 20 },
      { key: 'K', width: 20 },
    ];

    let lastRow = 2;
    worksheet.mergeCells(`B${lastRow}:N${lastRow}`);
    const title = worksheet.getCell(`B${lastRow}`);
    title.value = 'Adeudos academia';
    title.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    title.font = { bold: true, size: 16 };
    lastRow += 1;

    worksheet.mergeCells(`B${lastRow}:N${lastRow}`);
    const subtitle = worksheet.getCell(`B${lastRow}`);
    subtitle.value = `Reporte emitido en ${moment()
      .utc(true)
      .local()
      .locale('es')
      .format('lll')}`;
    subtitle.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    subtitle.font = { bold: true, size: 12 };
    lastRow += 2;

    const headersMatriz = matriz[0];

    const summaryColumns: TableColumnProperties[] = headersMatriz.map(
      (header, index) => {
        const column: TableColumnProperties = {
          name: header,
          filterButton: false,
        };

        if (index >= 1) {
          Object.assign(column, {
            totalsRowFunction: 'sum',
          });
        }

        return column;
      },
    );

    const summaryRows = [
      ...matriz
        .slice(1, -1)
        .map((row) =>
          row.map((column) =>
            isNaN(parseInt(column)) ? column : parseFloat(column),
          ),
        ),
    ];

    worksheet.addTable({
      displayName: 'Resumen',
      name: 'Resumen',
      ref: `B${lastRow}`,
      totalsRow: true,
      headerRow: true,
      style: {
        theme: 'TableStyleLight9',
        showRowStripes: true,
        showColumnStripes: true,
      },
      columns: summaryColumns,
      rows: summaryRows,
    });
    lastRow += summaryRows.length + 3;

    const dataColumns: TableColumnProperties[] = [
      { name: 'Fecha', filterButton: false },
      { name: 'Mes', filterButton: true },
      { name: 'Academia', filterButton: true },
      { name: 'Matricula', filterButton: true },
      { name: 'Nombre', filterButton: true },
      { name: 'Concepto', filterButton: false },
      { name: 'Importe', filterButton: false, totalsRowFunction: 'sum' },
      { name: 'Descuento', filterButton: false, totalsRowFunction: 'sum' },
      { name: 'Recargo', filterButton: false, totalsRowFunction: 'sum' },
      { name: 'Por cobrar', filterButton: false, totalsRowFunction: 'sum' },
    ];

    const dataRows = rows.map((row) => [
      moment(row.conceptPay).format('lll'),
      row.yearAndMonth,
      row.academyName,
      row.studentRegistration,
      row.studentName,
      row.conceptName,
      row.amountWithoutCharges,
      row.discount,
      row.surcharge,
      row.amountWithCharges,
    ]);

    worksheet.addTable({
      displayName: 'Datos',
      name: 'Datos',
      ref: `B${lastRow}`,
      totalsRow: true,
      headerRow: true,
      style: {
        theme: 'TableStyleLight9',
        showRowStripes: true,
        showColumnStripes: true,
      },
      columns: dataColumns,
      rows: dataRows,
    });

    return excel;
  }

  /**
   * Obtiene la matriz de totales de los conceptos.
   * @param dataWithMonth - Listado de los conceptos con el mes y año correspondiente.
   * @returns Una matriz con los totales por academia y mes .
   */
  private getMatriz(dataWithMonth: auxIAcademyReportConceptRow[]) {
    const resumeDataTable = [
      ['ACADEMIA', 'IMPORTE', 'DESCUENTO', 'RECARGO', 'POR COBRAR'],
    ];

    let totalSubAmount = 0;
    let totalDiscount = 0;
    let totalSurcharge = 0;
    let totalAmount = 0;

    const dic: { [key: string]: any } = dataWithMonth.reduce((acc, row) => {
      if (!acc[`${row.academyId}`]) {
        acc[`${row.academyId}`] = {
          title: row.academyName,
          amountWithCharges: row.amountWithCharges,
          amountWithoutCharges: row.amountWithoutCharges,
          discount: row.discount,
          surcharge: row.surcharge,
        };
      } else {
        acc[`${row.academyId}`].amountWithCharges += row.amountWithCharges;
        acc[`${row.academyId}`].amountWithoutCharges +=
          row.amountWithoutCharges;
        acc[`${row.academyId}`].discount += row.discount;
        acc[`${row.academyId}`].surcharge += row.surcharge;
      }
      totalSubAmount += row.amountWithoutCharges;
      totalDiscount += row.discount;
      totalSurcharge += row.surcharge;
      totalAmount += row.amountWithCharges;
      return acc;
    }, Object.assign({}));

    const array: SummaryRow[] = Object.values(dic);

    for (const item of array) {
      resumeDataTable.push([
        item.title,
        item.amountWithoutCharges.toString(),
        item.discount.toString(),
        item.surcharge.toString(),
        item.amountWithCharges.toString(),
      ]);
    }

    resumeDataTable.push([
      'TOTALES',
      totalSubAmount.toString(),
      totalDiscount.toString(),
      totalSurcharge.toString(),
      totalAmount.toString(),
    ]);

    return resumeDataTable;
  }
}
