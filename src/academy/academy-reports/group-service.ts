import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { GroupQuery } from './dto';
import { academiasQuery, inscripcionesQuery } from './query';
import * as moment from 'moment';
import { ExcelDocument } from 'src/reports';
import { AcademyDetailsRow, GroupRow, InscriptionDetailsRow } from './types';
import { S3Service } from 'src/common/storage/s3.service';
import { endOfDay, startOfDay } from 'date-fns';
const esMx = require('moment/locale/es-mx');

export class GroupService {
  constructor(
    @InjectConnection(ColegioDBNameConnection) private connection: Connection,
    private readonly s3Service: S3Service,
  ) {
    moment?.updateLocale('es', esMx);
  }

  /**
   * Obtiene los datos de ingresos por academias.
   * @param query - Consulta de ingresos por academias.
   * @returns Un objeto que contiene las filas de ingresos y la matriz de resumen.
   */
  public async getData(query: GroupQuery) {
    const academies = await this.getAcademies(query);

    const inscriptions = await this.getInscripcions(query);

    const groups = this.matchInscriptions(academies, inscriptions);

    groups.sort((a, b) => a.nombre_academia.localeCompare(b.nombre_academia));

    return {
      groups,
    };
  }

  public async buildDocument(groups: GroupRow[], query: GroupQuery) {
    const excel = new ExcelDocument();

    const startDate = startOfDay(new Date(`${query.startDate}T12:00:00`)).toISOString();
    const endDate = endOfDay(new Date(`${query.endDate}T12:00:00`)).toISOString();

    const monthNameStart = moment(startDate).format('MMMM');
    const monthNameEnd = moment(endDate).format('MMMM');

    const monthName =
      monthNameStart === monthNameEnd
        ? monthNameStart
        : `${monthNameStart} - ${monthNameEnd}`;

    let imageColegio: any = null;
    let imageAcademia: any = null;

    const logoColegio = await this.s3Service.getLogo('logos/colegiologo.png');

    if (logoColegio) {
      imageColegio = excel.book.addImage({
        buffer: logoColegio,
        extension: 'png',
      });
    }

    const logoAcademia = await this.s3Service.getLogo('logos/academiaslogo.png');

    if (logoAcademia) {
      imageAcademia = excel.book.addImage({
        buffer: logoAcademia,
        extension: 'png',
      });
    }

    groups.forEach((group, index) => {
      const { nombre_academia, nombre_grupo, integrantes } = group;

      const worksheet = excel.addWorksheet(
        `${index + 1}. ${nombre_grupo}`.slice(0, 31),
      );

      worksheet.columns = [
        { key: 'A', width: 3 },
        { key: 'B', width: 10 },
        { key: 'C', width: 35 },
      ];

      let lastRow = 1;
      let lastCol = 1;

      worksheet.getCell(`C${lastRow}`).value = `Lista de Asistencia`;
      worksheet.getCell(`C${lastRow}`).alignment = { horizontal: 'center' };
      worksheet.getCell(`C${lastRow}`).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      lastRow++;

      worksheet.getCell(`C${lastRow}`).value = `Academia: ${nombre_academia}`;
      worksheet.getCell(`C${lastRow}`).alignment = { horizontal: 'center' };
      worksheet.getCell(`C${lastRow}`).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      lastRow++;

      worksheet.getCell(`C${lastRow}`).value = `Grupo: ${nombre_grupo}`;
      worksheet.getCell(`C${lastRow}`).alignment = { horizontal: 'center' };
      worksheet.getCell(`C${lastRow}`).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      lastRow++;

      worksheet.getCell(`C${lastRow}`).value = `Mes: ${monthName}`;
      worksheet.getCell(`C${lastRow}`).alignment = { horizontal: 'center' };
      worksheet.getCell(`C${lastRow}`).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      lastRow++;

      if (!(imageColegio === null)) {
        worksheet.addImage(imageColegio, {
          tl: { col: 0.2, row: 0.2 },
          ext: { width: 80, height: 80 },
        });
      }

      if (!(imageAcademia === null)) {
        worksheet.addImage(imageAcademia, {
          tl: { col: 3.2, row: 0.2 },
          ext: { width: 80, height: 80 },
        });
      }

      lastRow++;

      const headers = ['No', 'Matricula', 'Nombre Alumno'];
      const days = [];

      const currentDate = moment(startDate);
      const endMoment = moment(endDate);

      while (currentDate.isSameOrBefore(endMoment)) {
        const dayOfWeekName = currentDate.format('dd');
        const dayOfWeek = currentDate.format('DD');

        if (dayOfWeekName !== 'sá' && dayOfWeekName !== 'do') {
          headers.push(dayOfWeek);
          days.push(dayOfWeekName);
        }
        currentDate.add(1, 'day');
      }

      for (let i = 4; i < headers.length + 1; i++) {
        worksheet.getColumn(i).width = 3;
      }

      for (let i = 0; i < days.length; i++) {
        const cell = worksheet.getCell(lastRow, i + 4);

        cell.value = days[i];
        cell.numFmt = '00';
        cell.font = {
          bold: true,
          color: { argb: 'FFFFFFFF' },
        };
        cell.alignment = {
          horizontal: 'center',
        };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '4F81BD' },
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      }

      lastRow++;

      headers.forEach((header) => {
        const cell = worksheet.getCell(lastRow, lastCol);

        cell.value = header;
        cell.font = {
          bold: true,
          color: { argb: 'FFFFFFFF' },
        };
        cell.alignment = {
          horizontal: 'center',
        };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '4F81BD' },
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };

        lastCol += 1;
      });

      lastCol = 1;
      lastRow += 1;

      integrantes.forEach((student, index) => {
        const cellNo = worksheet.getCell(lastRow, lastCol);
        cellNo.value = index + 1;
        lastCol++;

        const cellMat = worksheet.getCell(lastRow, lastCol);
        cellMat.value = student.matricula_alumno;
        lastCol++;

        const cellName = worksheet.getCell(lastRow, lastCol);
        cellName.value = student.nombre_alumno;
        lastCol++;

        const cells = [cellNo, cellMat, cellName];

        while (lastCol <= headers.length) {
          const cellDay = worksheet.getCell(lastRow, lastCol);
          cellDay.value = '';
          cells.push(cellDay);
          lastCol++;
        }

        cells.forEach((cell) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
          cell.alignment = {
            horizontal: 'left',
          };
        });
        lastCol = 1;
        lastRow++;
      });

      worksheet.pageSetup.orientation = 'landscape';
    });

    return excel;
  }

  /**
   * Obtiene los detalles de las academias para un grupo específico.
   *
   * @param {GroupQuery} args - Los argumentos que contienen el ID del grupo.
   * @returns {Promise<StudentDetailsRow[]>} Una promesa que resuelve a una lista de detalles de estudiantes.
   *
   * @remarks
   * Este método realiza una consulta a la base de datos utilizando el ID del grupo proporcionado y
   * transforma los resultados en un formato específico. Los campos numéricos se convierten a enteros,
   * los campos booleanos se convierten a valores booleanos, y los nombres se formatean con la primera
   * letra en mayúscula y el resto en minúscula.
   */
  private async getAcademies(args: GroupQuery): Promise<AcademyDetailsRow[]> {
    const { cycleId } = args;

    const rows: any[] = await this.connection.query(academiasQuery, [cycleId]);

    return rows.map(
      (row): AcademyDetailsRow => ({
        ...row,
        id_academia: parseInt(row.id_academia),
        id_grupo: parseInt(row.id_grupo),
        minimo_grupo: parseInt(row.minimo_grupo),
        maximo_grupo: parseInt(row.maximo_grupo),
        incluida_academia: !!row.incluida_academia,
        externo_academia: !!row.externo_academia,
        escolar_academia: !!row.escolar_academia,
        nombre_academia: `${row.nombre_academia}`
          .trim()
          .split(' ')
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(' ')
          .split(/[(,)]/)
          .join(''),

        horario_grupo: `${row.horario_grupo}`
          .trim()
          .split(' ')
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(' '),
        nombre_grupo: `${row.nombre_grupo}`
          .trim()
          .split(' ')
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(' '),
      }),
    );
  }

  /**
   * Obtiene las inscripciones de un grupo específico.
   *
   * @param {GroupQuery} args - Los argumentos de la consulta, que incluyen el ID del grupo.
   * @returns {Promise<InscriptionDetailsRow[]>} Una promesa que resuelve a una lista de detalles de inscripciones.
   *
   * @remarks
   * Este método realiza una consulta a la base de datos para obtener las inscripciones asociadas a un grupo específico.
   * Luego, transforma los datos obtenidos para asegurar que los campos numéricos sean enteros y que los nombres de los alumnos
   * estén correctamente capitalizados.
   */
  private async getInscripcions(
    args: GroupQuery,
  ): Promise<InscriptionDetailsRow[]> {
    const { cycleId } = args;

    const rows: any[] = await this.connection.query(inscripcionesQuery, [
      cycleId,
    ]);

    return rows.map(
      (row): InscriptionDetailsRow => ({
        ...row,
        id_academia: parseInt(row.id_academia),
        id_grupo: parseInt(row.id_grupo),
        matricula_alumno: `${row.matricula_alumno}`
          .trim()
          .toUpperCase()
          .split(' ')
          .join(' '),
        nombre_alumno: `${row.nombre_alumno}`
          .trim()
          .split(' ')
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(' '),
      }),
    );
  }

  /**
   * Empareja las inscripciones con las academias correspondientes y genera una lista de grupos.
   *
   * @param academias - Arreglo de detalles de academias.
   * @param inscripciones - Arreglo de detalles de inscripciones.
   * @returns Un arreglo de objetos `GroupRow` que contiene la información de los grupos y sus inscripciones correspondientes.
   *
   * @typedef {Object} AcademyDetailsRow - Detalles de una academia.
   * @property {number} id_academia - Identificador de la academia.
   * @property {string} nombre_academia - Nombre de la academia.
   * @property {number} id_grupo - Identificador del grupo.
   * @property {string} nombre_grupo - Nombre del grupo.
   * @property {number} maximo_grupo - Número máximo de integrantes del grupo.
   * @property {number} minimo_grupo - Número mínimo de integrantes del grupo.
   * @property {boolean} escolar_academia - Indica si la academia es escolar.
   * @property {boolean} externo_academia - Indica si la academia es externa.
   * @property {boolean} incluida_academia - Indica si la academia está incluida.
   *
   * @typedef {Object} InscriptionDetailsRow - Detalles de una inscripción.
   * @property {number} id_academia - Identificador de la academia.
   * @property {string} nombre_academia - Nombre de la academia.
   * @property {number} id_grupo - Identificador del grupo.
   * @property {string} nombre_grupo - Nombre del grupo.
   * @property {number} maximo_grupo - Número máximo de integrantes del grupo.
   * @property {number} minimo_grupo - Número mínimo de integrantes del grupo.
   * @property {boolean} escolar_academia - Indica si la academia es escolar.
   * @property {boolean} externo_academia - Indica si la academia es externa.
   * @property {boolean} incluida_academia - Indica si la academia está incluida.
   *
   * @typedef {Object} GroupRow - Detalles de un grupo.
   * @property {number} id_academia - Identificador de la academia.
   * @property {string} nombre_academia - Nombre de la academia.
   * @property {number} id_grupo - Identificador del grupo.
   * @property {string} nombre_grupo - Nombre del grupo.
   * @property {number} maximo_grupo - Número máximo de integrantes del grupo.
   * @property {number} minimo_grupo - Número mínimo de integrantes del grupo.
   * @property {boolean} escolar_academia - Indica si la academia es escolar.
   * @property {boolean} externo_academia - Indica si la academia es externa.
   * @property {boolean} incluida_academia - Indica si la academia está incluida.
   * @property {number} integrantes - Número de integrantes en el grupo.
   * @property {InscriptionDetailsRow[]} alumnos - Arreglo de inscripciones correspondientes al grupo.
   */
  private matchInscriptions(
    academias: AcademyDetailsRow[],
    inscripciones: InscriptionDetailsRow[],
  ): GroupRow[] {
    return academias.map(
      (academia): GroupRow => {
        const {
          id_academia,
          nombre_academia,
          id_grupo,
          nombre_grupo,
          maximo_grupo,
          minimo_grupo,
          escolar_academia,
          externo_academia,
          incluida_academia,
        } = academia;

        const integrantes = inscripciones.filter(
          (inscripcion) => inscripcion.id_grupo === academia.id_grupo,
        );

        return {
          id_academia,
          nombre_academia,
          id_grupo,
          nombre_grupo,
          maximo_grupo,
          minimo_grupo,
          escolar_academia,
          externo_academia,
          incluida_academia,
          integrantes,
        };
      },
    );
  }
}
