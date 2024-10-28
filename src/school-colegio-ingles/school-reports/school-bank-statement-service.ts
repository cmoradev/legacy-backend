import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { startOfDay, endOfDay, format } from 'date-fns';
import { PaymentStatus } from '../../common/enums/PaymentStatus';
import { NotFoundException } from '@nestjs/common';
import {
  groupBy,
  getMonthsBetweenDate,
  MonthDate,
} from '../../common/functions';
import { SchoolBankStatementQuery } from './dto';
import { IReportConceptRow } from '../school-payments/interfaces/IReportConceptRow.interface';
import { auxISchoolReportConceptRow, SchoolBase, SchoolGroupByMonth, SchoolMonthDate } from './types';

export class SchoolBankStatementService {
  constructor(
    @InjectConnection(ColegioDBNameConnection) private connection: Connection,
  ) {}

  /**
   * Obtiene los datos de ingresos por academias.
   * @param query - Consulta de ingresos por academias.
   * @returns Un objeto que contiene las filas de ingresos y la matriz de resumen.
   */
  public async schoolBankStatement(query: SchoolBankStatementQuery) {
    
    const concepts = await this.getDetailsConcept(query);

    const conceptsByMonth = this.groupByMonth(concepts);

    const months = getMonthsBetweenDate(
      query.startDate,
      query.endDate,
    );

    const matriz = this.getMatriz(
      months,
      conceptsByMonth.grades,
      conceptsByMonth.dataWithMonth,
    );

    return {
      rows: { ...conceptsByMonth, months },
      matriz,
    };
  }

  /**
   * Obtiene los detalles de ventas de un alumno entre un rango de fechas y un estado especifico (opcional).
   * @param query - Consulta de ingresos por grado/mes del alumno.
   * @returns Una lista de detalles de ingresos.
   */
  private async getDetailsConcept(
    query: SchoolBankStatementQuery,
  ): Promise<IReportConceptRow[]> {
    const conceptStatus = query.paymentStatus
      ? parseInt(`${query.paymentStatus}`)
      : undefined;

    const startDate = startOfDay(query.startDate).toISOString();

    const endDate = endOfDay(query.endDate).toISOString();

    let queryString = `SELECT * FROM vw_status_concepts WHERE studentId = ${query.studentId}`;

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
   * Obtiene agrupaciones de los datos por fecha y  grado
   * @param data - Consulta de los conceptos sin tratar.
   * @returns listado de los datos agrupados por fecha y grado.
   */
  public groupByMonth(data: IReportConceptRow[]): SchoolGroupByMonth {
    const dataWithMonth = data
      .map((value: IReportConceptRow) => ({
        ...value,
        yearAndMonth: format(value.conceptPay, 'yyyy-MM'),
      }))
      .sort(
        (a, b) =>
          new Date(a.yearAndMonth).getTime() -
          new Date(b.yearAndMonth).getTime(),
      );

    const grades = this.getUniqueAcademyIds(dataWithMonth);

    const dataGroupByMount = groupBy(
      dataWithMonth,
      (value) => value.yearAndMonth,
    );

    const dataGroupByGroup = groupBy(
      dataWithMonth,
      (value) => value.gradeId.toString(),
    );

    const groupByMountKey = Object.keys(dataGroupByMount);

    const dataGroupByMountAndGroup = {};

    for (let i = 0; i < groupByMountKey.length; i++) {
      const id = `${groupByMountKey[i]}`;
      const groupByGroup = groupBy(
        dataGroupByMount[id],
        (value) => `${value.gradeId}`,
      );

      dataGroupByMountAndGroup[id] = {
        ...groupByGroup,
      };
    }

    return {
      grades,
      dataWithMonth,
      dataGroupByGroup,
      dataGroupByMount,
      dataGroupByMountAndGroup,
    };
  }

  /**
   * Obtiene la matriz de totales de los conceptos.
   * @param months - Listado de los meses consultados.
   * @param groups - Listado de grupos de los conceptos consultados, sin duplicar.
   * @param dataWithMonth - Listado de los conceptos con el mes y año correspondiente.
   * @returns Una matriz con los totales por grado y mes .
   */
  public getMatriz(
    months: SchoolMonthDate[],
    grades: SchoolBase[],
    dataWithMonth: auxISchoolReportConceptRow[],
  ) {
    const resumeDataTable = [
      [
        'Grado',
        ...months.map((value) => `${value.name} - ${value.year}`),
        'Total',
      ],
    ];

    const header = [...grades, { name: 'Totales', id: 0 }];
    for (const school of header) {
      const resumeDataTableItem: any[] = [school.name];

      for (const month of months) {

        let total = 0;

        let filtered = [];

        if (school.id != 0) {
          const filteredResume = dataWithMonth.filter(
            (value) =>
              value.yearAndMonth === month.date &&
              value.gradeId === school.id,
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
                previousValue +
                currentValue.conceptQuantity *
                  parseFloat(currentValue.conceptPrice)
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
   * Obtiene un listado de las grados sin repetir.
   * @param data - Consulta de los conceptos sin tratar.
   * @returns Una lista unica de grados.
   */
  public getUniqueAcademyIds(data: IReportConceptRow[]) {
    const seenAcademyIds = new Set<number>(); // Array de gradeId sin repetir

    return data
      .filter((item) => {
        if (!seenAcademyIds.has(item.gradeId)) {
          seenAcademyIds.add(item.gradeId); // Agrega el gradeId al conjunto si aún no está presente
          return true; // Incluye este item en el nuevo array
        } else {
        }
        return false; // Si el gradeId ya fue visto, lo excluye
      })
      .map((value) => ({ id: value.gradeId, name: `${value.levelName} - ${value.gradeName}` }));
  }
}
