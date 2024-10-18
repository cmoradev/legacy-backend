import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { AcademyDebitQuery } from './dto';
import { startOfDay, endOfDay} from 'date-fns';
import { PaymentStatus } from '../../common/enums/PaymentStatus';
import { NotFoundException } from '@nestjs/common';
import {
  getMonthsBetweenDate,
} from '../../common/functions';
import { IAcademyReportConceptRow } from '../academy-inscription-concepts/interfaces/IQueryReport';
import { AcademyBankStatementService } from './academy-bank-statement-service';
import { ExcelDocument } from '../../reports/excel.document';
import * as moment from 'moment';
import { TableColumnProperties } from 'exceljs';
import { auxIAcademyReportConceptRow } from './types';
const esMx = require('moment/locale/es-mx');

export class AcademyDebitService {
  constructor(
    @InjectConnection(ColegioDBNameConnection) private connection: Connection,
    private readonly academyBankStatementService: AcademyBankStatementService
  ) {}

  /**
   * Obtiene los datos de ingresos por academias.
   * @param query - Consulta de ingresos por academias.
   * @returns Un objeto que contiene las filas de ingresos y la matriz de resumen.
   */
  public async academyDebit(query: AcademyDebitQuery) {
    
    const concepts = await this.getDebitDetailsConcept(query);

    const conceptsByMonth = this.academyBankStatementService.groupByMonth(concepts);

    const months = getMonthsBetweenDate(
      new Date(query.startDate),
      new Date(query.endDate),
    );

    const matriz = this.academyBankStatementService.getMatriz(
      months,
      conceptsByMonth.academies,
      conceptsByMonth.dataWithMonth,
    );

    return {
      rows: { ...conceptsByMonth, months },
      matriz,
    };
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

    try {
      return this.connection.query(queryString);
    } catch (e) {
      throw new NotFoundException(
        `Error in query or conection [${queryString}]`,
      );
    }
  }

  public async buildDocument(matriz: string[][], rows: auxIAcademyReportConceptRow[]) {
    const excel = new ExcelDocument();

    const worksheet = excel.addWorksheet('Adeudos');

    worksheet.columns = [
      { key: 'A', width: 10 },
      { key: 'B', width: 20 },
      { key: 'C', width: 20 },
      { key: 'D', width: 20 },
      { key: 'E', width: 20 },
      { key: 'F', width: 20 },
      { key: 'G', width: 45 },
      { key: 'H', width: 20 },
      { key: 'I', width: 20 },
      { key: 'J', width: 20 },
    ];

    let lastRow = 2;
    worksheet.mergeCells(`B${lastRow}:N${lastRow}`);
    const title = worksheet.getCell(`B${lastRow}`);
    title.value = 'Adeudos';
    title.style = {
      alignment: { horizontal: 'center', vertical: 'middle' },
    };
    title.font = { bold: true, size: 16 };
    lastRow += 1;

    worksheet.mergeCells(`B${lastRow}:N${lastRow}`);
    const subtitle = worksheet.getCell(`B${lastRow}`);
    subtitle.value = `Reporte emitido en ${moment()
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

    const summaryRows = [...matriz.slice(1, -1)];

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
      { name: 'Matricula', filterButton: false },
      { name: 'Nombre', filterButton: false },
      { name: 'Concepto', filterButton: false },
      { name: 'Cantidad', filterButton: false },
      { name: 'Precio', filterButton: false },
      { name: 'Importe', filterButton: false, totalsRowFunction: 'sum' },
    ];

    const dataRows = rows.map((row) => [
      moment(row.conceptPay).format('lll'),
      row.yearAndMonth,
      row.academyName,
      row.studentRegistration,
      row.studentName,
      row.conceptName,
      row.conceptQuantity,
      parseFloat(row.conceptPrice),
      (row.conceptQuantity * parseInt(row.conceptPrice))
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
}
