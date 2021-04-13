import * as ExcelJS from 'exceljs';
function nameColumn(item: string) {
    let columnName = {
        matricula: { name: 'Matricula' },
        name: { name: 'Nombre' },
        lastNameFather: { name: 'Apellido paterno' },
        lastNameMother: { name: 'Apellido materno' },
        age: { name: 'Edad', isOptional: true },
        gender: { name: 'Sexo', isOptional: true },
        address: { name: 'Direccion', IsOptional: true },
        bloodType: { name: 'Tipo de sangre', isOptional: true },
        birthdate: { name: 'Fecha de nacimiento', isOptional: true },
        curp: { name: 'CURP' },
        typeStudent: { name: 'Tipo de estudiante' },
        studentCampus: { name: 'Plantel' },
        family: { name: 'Familia' },
    }
    return columnName[item];
}
export async function generateTemplateStudents(workBook: ExcelJS.Workbook, headers: string[]) {
    const sheet = workBook.addWorksheet('Layout', {
        views: [{
            state: 'normal',
        }],
        properties: {
            tabColor: {
                argb: '08A8D4'
            },
        },
    });
    let columns = [];
    let optionalColumns = [];
    headers.forEach((item) => {
        columns.push({
            header: nameColumn(item).name, key: item, style: { border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } } }
        });
        if (nameColumn(item).isOptional) {
            optionalColumns.push(nameColumn(item).name);
        }
    });
    sheet.columns = columns;
    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1'].map(key => {
        sheet.getCell(key).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '08A8D4' }
        };
        sheet.getCell(key).font = {
            color: {
                argb: 'FFFFFF'
            },
            bold: true
        }
    });

    sheet.columns = [...sheet.columns, { header: 'Campos optionales', key: 'optionalFields' }]
    optionalColumns.forEach(item => {
        sheet.addRow({ optionalFields: item })
    })
    sheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) {
            row.eachCell((cell) => cell.protection = { locked: true })
        }
    })
    return workBook;
}
export async function generateCatalog(workBook: ExcelJS.Workbook, dataCampus: any[], dataFamilies: any[]) {
    /*   student = 1,
    externo = 2,
    prospecto = 3, */
    const sheetCatalog = workBook.addWorksheet('Catalogos', {
        views: [{
            state: 'normal',
        }],
        properties: {
            tabColor: {
                argb: '08A8D4'
            },
        },
    });
    sheetCatalog.addTable({
        name: 'Catalogo tipo estudiante',
        ref: 'A1',
        headerRow: true,
        totalsRow: false,
        style: {
            theme: 'TableStyleLight9',
            showRowStripes: false,
        },
        columns: [{ name: 'ID' }, { name: 'Tipo estudiante' }],
        rows: [[1, 'Estudiante'], [2, 'Externo'], [3, 'Prospecto']],
    });
    sheetCatalog.addTable({
        name: 'Catalogo planteles',
        ref: 'D1',
        headerRow: true,
        totalsRow: false,
        style: {
            theme: 'TableStyleLight9',
            showRowStripes: true,
        },
        columns: [{ name: 'ID' }, { name: 'Plantel' }],
        rows: [['TEST'], ['TEST'], ['TEST']],
    });
    sheetCatalog.addTable({
        name: 'Catalogo familias',
        ref: 'G1',
        headerRow: true,
        totalsRow: false,
        style: {
            theme: 'TableStyleLight9',
            showRowStripes: true,
        },
        columns: [{ name: 'ID' }, { name: 'Familia' }],
        rows: [['TEST'], ['TEST'], ['TEST']],
    });
    return workBook;
}