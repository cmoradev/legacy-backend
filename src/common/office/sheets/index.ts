import { ExcelSheet } from './interfaces/excel.interface';

// regresa un array de objetos con  dos propiedades name y data con
// objetos con nombres de las propiedades de la primera fila que coincida
// con la cantidad indicada de sheetlengt
export function sheetToObject(sheets: ExcelSheet[], sheetlength: number[]) {
    const excelData: any = [];
    if (sheets.length === sheetlength.length) {
        for (const [i, sheet] of sheets.entries()) {
            const sheetObj: any = {
                name: sheet.name,
                data: [],
            };
            const head = {
                count: sheetlength[i],
                find: false,
                items: [],
            };
            for (const sheetData of sheet.data) {
                if (head.find === true) {
                    const objtArray = {};
                    for (let p = 0; p < head.count - 1; p++) {
                        objtArray[head.items[p].replace(' ', '_').toLowerCase()] = sheetData[p];
                    }
                    sheetObj.data.push(objtArray);
                } else {
                    if (sheetData.filter((el) => {
                        return el != null;
                    }).length === head.count) {
                        head.items = sheetData;
                        head.find = true;
                    }
                }
            }
            excelData.push(sheetObj);
        }
    }
    return excelData;
}

// Tomara la primera linea como encabeazado
// para crear el array de objetos a retornar
// por defecto reresa la primera pagina

export async function sheetToObjPage(sheets: ExcelSheet[], page: number = 0, allpage: boolean = false) {
    const excelData: any = [];
    for (const [i, sheet] of sheets.entries()) {
        let obj: any;

        if (allpage === false && i === page) {
            obj = await tObjet(sheet);
            return obj;
        } else {
            obj = await tObjet(sheet);
            excelData.push(obj);
        }

    }
    return excelData;
}

async function tObjet(sheet: ExcelSheet) {

    const sheetObj: any = {
        name: sheet.name,
        data: [],
    };

    const head = {
        find: false,
        items: [],
    };
    for (const [k, sheetData] of sheet.data.entries()) {
        if (k === 0) {
            head.items = sheetData; // console.log(Object.assign({}, sheetData))
        } else {
            const objtArray = {};
            for (let p = 0; p < head.items.length; p++) {
                objtArray[head.items[p].replace(' ', '_').toLowerCase()] = sheetData[p];
            }
            sheetObj.data.push(objtArray);
        }
    }
    return sheetObj;
}
