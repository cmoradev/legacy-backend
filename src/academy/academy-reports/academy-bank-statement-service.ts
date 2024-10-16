import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { AcademyBankStatementQuery } from './dto';
import { startOfDay, endOfDay, format } from 'date-fns';
import { PaymentStatus } from '../../common/enums/PaymentStatus';
import { NotFoundException } from '@nestjs/common';
import {
  groupBy,
  getMonthsBetweenDate,
  MonthDate,
} from '../../common/functions';
import { IAcademyReportConceptRow } from '../academy-inscription-concepts/interfaces/IQueryReport';

type auxIAcademyReportConceptRow = {
  yearAndMonth: string;
} & IAcademyReportConceptRow;

type base = {
  id: number;
  name: string;
};

type groupByMonth = {
  academies: base[];
  dataWithMonth: auxIAcademyReportConceptRow[];
  dataGroupByAcademy: ObjGroupByAcademy,
  dataGroupByMount: ObjGroupByMount;
  dataGroupByMountAndAcademy: ObjGroupByMountAndAcademy;
};

export type ObjGroupByMountAndAcademy = {
  [property: string]: {
    [property: string]: IAcademyReportConceptRow[]
  }
}

export type ObjGroupByMount = {
  [property: string]: IAcademyReportConceptRow[]
}

export type ObjGroupByAcademy = {
  [property: string]: IAcademyReportConceptRow[]
}

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
    
    const concepts = await this.getDetailsConcept(query);

    const conceptsByMonth = this.groupByMonth(concepts);

    const months = getMonthsBetweenDate(
      new Date(query.startDate),
      new Date(query.endDate),
    );

    const matriz = this.getMatriz(
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

    const startDate = startOfDay(query.startDate).toISOString();

    const endDate = endOfDay(query.endDate).toISOString();

    let queryString = `SELECT * FROM vw_aca_status_concepts WHERE studentId = ${query.studentId}`;

    if (typeof conceptStatus !== 'undefined') {
      if (`${conceptStatus}` === `${PaymentStatus.Debit}`) {
        queryString = `${queryString} AND conceptStatus = ${conceptStatus} AND conceptPaid IS NULL AND inscriptionStatus = '2'`;
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

  /**
   * Obtiene agrupaciones de los datos por fecha y  academia
   * @param data - Consulta de los conceptos sin tratar.
   * @returns listado de los datos agrupados por fecha y academia.
   */
  private groupByMonth(data: IAcademyReportConceptRow[]): groupByMonth {
    const dataWithMonth = data
      .map((value: IAcademyReportConceptRow) => ({
        ...value,
        yearAndMonth: format(value.conceptPay, 'yyyy-MM'),
      }))
      .sort(
        (a, b) =>
          new Date(a.yearAndMonth).getTime() -
          new Date(b.yearAndMonth).getTime(),
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
    academies: base[],
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
   * Obtiene un listado de las academias sin repetir.
   * @param data - Consulta de los conceptos sin tratar.
   * @returns Una lista unica de academias.
   */
  private getUniqueAcademyIds(data: IAcademyReportConceptRow[]) {
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
}
