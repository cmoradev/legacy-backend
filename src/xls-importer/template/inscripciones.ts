import * as ExcelJS from 'exceljs';
import { setCatalog } from '../utils/setCatalog';

function nameColumn(item: string) {
    const columnName = {
        id: { name: 'Id' },
        idStatus: { name: 'Estado' },
        inscripStudent: { name: 'Estudiante' },
        inscripGroup: { name: 'Grupo' },
        inscripGrade: { name: 'Grado' },
        inscripLevel: { name: 'Nivel' },
        inscripCycle: { name: 'Ciclo' },
        inscripCampus: { name: 'Plantel' },
        inscripClassroom: { name: 'Salon' },
        paymentPlan: { name: 'Plan de pago' },
        inscripStudyPlan: { name: 'Plan de estudio' },
        inscripStudyPlanVariant: { name: 'Variante de plan de estudio' },
        schoolPayments: { name: 'Conceptos de pago' },
    };
    return columnName[item];
}

export async function generateTemplateInscriptions(workBook: ExcelJS.Workbook, headers: string[]) {
    const sheet = workBook.addWorksheet('Layout', {
        views: [{
            state: 'normal',
        }],
        properties: {
            tabColor: {
                argb: '08A8D4',
            },
        },
    });
    const columns = [];
    const optionalColumns = [];
    headers.forEach((item) => {
        if (item === 'schoolPayments') {
            columns.push({ header: 'Mensualidades', key: 'mensualidad', style: { border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } } } });
            columns.push({ header: 'Inscripciones', key: 'inscripciones', style: { border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } } } });
        }
        if (item !== 'schoolPayments') {
            columns.push({
                header: nameColumn(item).name, key: item, style: { border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } } },
            });
        }
        if (nameColumn(item).isOptional) {
            optionalColumns.push(nameColumn(item).name);
        }
    });
    sheet.columns = columns;
    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1'].map(key => {
        sheet.getCell(key).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '08A8D4' },
        };
        sheet.getCell(key).font = {
            color: {
                argb: 'FFFFFF',
            },
            bold: true,
        };
    });

    sheet.columns = [...sheet.columns, { header: 'Campos optionales', key: 'optionalFields' }];
    optionalColumns.forEach(item => {
        sheet.addRow({ optionalFields: item });
    });
    sheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) {
            row.eachCell((cell) => cell.protection = { locked: true });
        }
    });
    return workBook;
}
