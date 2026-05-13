import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import * as moment from 'moment';
import { ExcelDocument } from 'src/reports';
import { ConfigService } from 'src/common/config/config.service';
import { Configuration } from 'src/common/config/config.keys';
import { fileExists } from 'src/helpers';
import { endOfDay, startOfDay } from 'date-fns';
import { SchoolGroupQuery as GroupQuery } from './dto';
import {
  SchoolDetailsRow,
  SchoolGradeRow,
  SchoolGroupRow,
  SchoolInscriptionDetailsRow,
} from './types';
import { SchoolGroupsQuery, SchoolInscripcionesQuery } from './query';
const esMx = require('moment/locale/es-mx');

export class SchoolGroupService {
  constructor(
    private readonly configService: ConfigService,
    @InjectConnection(ColegioDBNameConnection) private connection: Connection,
  ) {
    moment?.updateLocale('es', esMx);
  }

  /**
   * Obtiene los grupos e incripciones del ciclo en colegio.
   * @param query - Consulta de grupos por ciclo.
   * @returns Un objeto que contiene las grupos.
   */
  public async getData(query: GroupQuery) {
    const classrooms = await this.getClassrooms(query);

    const inscriptions = await this.getInscripcions(query);

    const groups = this.matchInscriptions(classrooms, inscriptions);

    const nivelOrder = {
      Maternal: 0,
      Preescolar: 1,
      Primaria: 2,
      Secundaria: 3,
    };

    groups.sort((a, b) => {
      const nivelDiff =
        (nivelOrder[a.nivel] ?? 99) - (nivelOrder[b.nivel] ?? 99);
      if (nivelDiff !== 0) return nivelDiff;

      const gradoDiff = a.id_grado - b.id_grado;
      if (gradoDiff !== 0) return gradoDiff;

      return a.nombre_grupo.localeCompare(b.nombre_grupo);
    });

    groups.forEach((group) => {
      group.integrantes.sort((a, b) => {
        const cmp1 = a.apellido_paterno.localeCompare(b.apellido_paterno);
        if (cmp1 !== 0) return cmp1;

        const cmp2 = a.apellido_materno.localeCompare(b.apellido_materno);
        if (cmp2 !== 0) return cmp2;

        return a.nombre.localeCompare(b.nombre);
      });
    });

    return {
      groups,
    };
  }

  public async getGradesData(query: GroupQuery) {
    const classrooms = await this.getClassrooms(query);

    const inscriptions = await this.getInscripcions(query);

    const groups = this.matchInscriptions(classrooms, inscriptions);

    const grades = this.groupByGrade(groups);

    const nivelOrder = {
      Maternal: 0,
      Preescolar: 1,
      Primaria: 2,
      Secundaria: 3,
    };

    grades.sort((a, b) => {
      const nivelDiff =
        (nivelOrder[a.nivel] ?? 99) - (nivelOrder[b.nivel] ?? 99);
      if (nivelDiff !== 0) return nivelDiff;

      return a.id_grado - b.id_grado;
    });

    grades.forEach((grade) => {
      grade.integrantes.sort((a, b) => {
        const cmp1 = a.apellido_paterno.localeCompare(b.apellido_paterno);
        if (cmp1 !== 0) return cmp1;

        const cmp2 = a.apellido_materno.localeCompare(b.apellido_materno);
        if (cmp2 !== 0) return cmp2;

        return a.nombre.localeCompare(b.nombre);
      });
    });

    return {
      grades,
    };
  }

  public async buildGradeDocument(grades: SchoolGradeRow[], query: GroupQuery) {
    const excel = new ExcelDocument();

    const startDate = startOfDay(`${query.startDate}T12:00:00`).toISOString();
    const endDate = endOfDay(`${query.endDate}T12:00:00`).toISOString();

    const monthNameStart = moment(startDate).format('MMMM');
    const monthNameEnd = moment(endDate).format('MMMM');

    const monthName =
      monthNameStart === monthNameEnd
        ? monthNameStart
        : `${monthNameStart} - ${monthNameEnd}`;

    const ASSETS_FOLDER = this.configService.get(Configuration.ASSETS_PATH);

    let imageColegio: any = null;

    if (!!ASSETS_FOLDER) {
      const pathColegioLogo = `${ASSETS_FOLDER}colegio_logo.png`;

      const isExistsColegioLogo = await fileExists(pathColegioLogo);

      if (isExistsColegioLogo) {
        imageColegio = excel.book.addImage({
          filename: pathColegioLogo,
          extension: 'png',
        });
      }
    }

    grades.forEach((grade, index) => {
      const { grado, nivel, integrantes } = grade;

      const worksheet = excel.addWorksheet(
        `${index + 1}.${nivel} -  ${grado}`.slice(0, 31),
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

      worksheet.getCell(`C${lastRow}`).value = `Nivel: ${nivel}`;
      worksheet.getCell(`C${lastRow}`).alignment = { horizontal: 'center' };
      worksheet.getCell(`C${lastRow}`).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      lastRow++;

      worksheet.getCell(`C${lastRow}`).value = `Grado: ${grado}`;
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

      integrantes.forEach((student, studentIndex) => {
        const cellNo = worksheet.getCell(lastRow, lastCol);
        cellNo.value = studentIndex + 1;
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

  public async buildDocument(groups: SchoolGroupRow[], query: GroupQuery) {
    const excel = new ExcelDocument();

    const startDate = startOfDay(`${query.startDate}T12:00:00`).toISOString();
    const endDate = endOfDay(`${query.endDate}T12:00:00`).toISOString();

    const monthNameStart = moment(startDate).format('MMMM');
    const monthNameEnd = moment(endDate).format('MMMM');

    const monthName =
      monthNameStart === monthNameEnd
        ? monthNameStart
        : `${monthNameStart} - ${monthNameEnd}`;

    const ASSETS_FOLDER = this.configService.get(Configuration.ASSETS_PATH);

    let imageColegio: any = null;

    if (!!ASSETS_FOLDER) {
      const pathColegioLogo = `${ASSETS_FOLDER}colegio_logo.png`;

      const isExistsColegioLogo = await fileExists(pathColegioLogo);

      if (isExistsColegioLogo) {
        imageColegio = excel.book.addImage({
          filename: pathColegioLogo,
          extension: 'png',
        });
      }
    }

    groups.forEach((group, index) => {
      const { grado, nivel, nombre_grupo, integrantes } = group;

      const worksheet = excel.addWorksheet(
        `${index + 1}.${nivel} -  ${grado} ${nombre_grupo}`.slice(0, 31),
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

      worksheet.getCell(`C${lastRow}`).value = `Nivel: ${nivel}`;
      worksheet.getCell(`C${lastRow}`).alignment = { horizontal: 'center' };
      worksheet.getCell(`C${lastRow}`).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      lastRow++;

      worksheet.getCell(`C${lastRow}`).value = `Grado: ${grado}`;
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
  private async getClassrooms(args: GroupQuery): Promise<SchoolDetailsRow[]> {
    const { cycleId } = args;

    const rows: any[] = await this.connection.query(SchoolGroupsQuery, [
      cycleId,
    ]);

    return rows.map(
      (row): SchoolDetailsRow => ({
        ...row,
        minimo_grupo: parseInt(row.minimo_grupo),
        maximo_grupo: parseInt(row.maximo_grupo),
        id_grupo: parseInt(row.id_grupo),
        nombre_grupo: `${row.nombre_grupo}`
          .trim()
          .split(' ')
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(' '),
        id_grado: parseInt(row.id_grado),
        grado: `${row.grado}`
          .trim()
          .split(' ')
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(' '),
        id_nivel: parseInt(row.id_nivel),
        nivel: `${row.nivel}`
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
  ): Promise<SchoolInscriptionDetailsRow[]> {
    const { cycleId } = args;

    const rows: any[] = await this.connection.query(SchoolInscripcionesQuery, [
      cycleId,
    ]);

    return rows.map(
      (row): SchoolInscriptionDetailsRow => ({
        ...row,
        id_grupo: parseInt(row.id_grupo),
        id_grado: parseInt(row.id_grado),
        id_nivel: parseInt(row.id_nivel),
        matricula_alumno: `${row.matricula_alumno}`
          .trim()
          .toUpperCase()
          .split(' ')
          .join(' '),
        nombre_alumno: `${row.apellido_paterno}`
          .trim()
          .split(' ')
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(' ') + ' ' +
          `${row.apellido_materno}`
            .trim()
            .split(' ')
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(' ') + ' ' +
          `${row.nombre}`
            .trim()
            .split(' ')
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
            )
            .join(' '),
        apellido_paterno: `${row.apellido_paterno}`
          .trim()
          .split(' ')
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(' '),
        apellido_materno: `${row.apellido_materno}`
          .trim()
          .split(' ')
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(' '),
        nombre: `${row.nombre}`
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
   * Empareja las inscripciones con las salones correspondientes y genera una lista de grupos.
   *
   * @param classrooms - Arreglo de detalles de salones.
   * @param inscripciones - Arreglo de detalles de inscripciones.
   * @returns Un arreglo de objetos `SchoolGroupRow` que contiene la información de los grupos y sus inscripciones correspondientes.
   *
   * @typedef {Object} SchoolDetailsRow - Detalles de una academia.
   * @property {number} id_grupo - Identificador del grupo.
   * @property {string} nombre_grupo - Nombre del grupo.
   * @property {number} maximo_grupo - Número máximo de integrantes del grupo.
   * @property {number} minimo_grupo - Número mínimo de integrantes del grupo.
   * @property {number} id_grado - Identificador del grado.
   * @property {string} grado - Nombre del grado.
   * @property {number} id_nivel - Identificador del nivel.
   * @property {string} nivel - Nombre del nivel.
   *
   * @typedef {Object} InscriptionDetailsRow - Detalles de una inscripción.
   * @property {number} id_grupo - Identificador del grupo.
   * @property {number} id_grado - Identificador del grado.
   * @property {number} id_nivel - Identificador del nivel.
   * @property {string} nombre_grupo - Nombre del grupo.
   * @property {number} maximo_grupo - Número máximo de integrantes del grupo.
   * @property {number} minimo_grupo - Número mínimo de integrantes del grupo.
   *
   * @typedef {Object} SchoolGroupRow - Detalles de un grupo.
   * @property {number} id_grupo - Identificador del grupo.
   * @property {string} nombre_grupo - Nombre del grupo.
   * @property {number} id_grado - Identificador del grado.
   * @property {string} grado - Nombre del grado.
   * @property {number} id_nivel - Identificador del nivel.
   * @property {string} nivel - Nombre del nivel.
   * @property {number} maximo_grupo - Número máximo de integrantes del grupo.
   * @property {number} minimo_grupo - Número mínimo de integrantes del grupo.
   * @property {number} integrantes - Número de integrantes en el grupo.
   * @property {SchoolInscriptionDetailsRow[]} alumnos - Arreglo de inscripciones correspondientes al grupo.
   */
  private matchInscriptions(
    classrooms: SchoolDetailsRow[],
    inscripciones: SchoolInscriptionDetailsRow[],
  ): SchoolGroupRow[] {
    return classrooms.map(
      (classroom): SchoolGroupRow => {
        const {
          id_grupo,
          nombre_grupo,
          maximo_grupo,
          minimo_grupo,
          id_grado,
          grado,
          id_nivel,
          nivel,
        } = classroom;

        const integrantes = inscripciones.filter(
          (inscripcion) => inscripcion.id_grupo === classroom.id_grupo,
        );

        return {
          id_grupo,
          nombre_grupo,
          maximo_grupo,
          minimo_grupo,
          id_grado,
          id_nivel,
          nivel,
          grado,
          integrantes,
        };
      },
    );
  }

  private groupByGrade(groups: SchoolGroupRow[]): SchoolGradeRow[] {
    const dic = groups.reduce(
      (acc, group) => {
        const key = `${group.id_grado}`;
        if (!acc[key]) {
          acc[key] = {
            id_nivel: group.id_nivel,
            nivel: group.nivel,
            id_grado: group.id_grado,
            grado: group.grado,
            integrantes: [],
          };
        }

        acc[key].integrantes.push(...group.integrantes);
        return acc;
      },
      {} as { [key: string]: SchoolGradeRow },
    );

    return Object.values(dic);
  }
}
