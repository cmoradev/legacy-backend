import * as Excel from 'exceljs';
import { Borders } from 'exceljs';

export class SimpleReport {
    public generate(): Excel.Workbook {
        const workbook = new Excel.Workbook();
        workbook.views = [
            {
                x: 0, y: 0, width: 10000, height: 20000,
                firstSheet: 0, activeTab: 1, visibility: 'visible',
            },
        ];

        const image = workbook.addImage({
            filename: './public/images/little-store-logo.png',
            extension: 'png',
        });

        const paymentsSheet = workbook.addWorksheet('Alumnos', {
            properties:
                {
                    tabColor: {
                        argb: '359c5b',
                    },
                },
        });

        paymentsSheet.addImage(image, { ext: { height: 100, width: 90 }, tl: { col: 1, row: 1 } });
        paymentsSheet.mergeCells('D2:H2');
        paymentsSheet.mergeCells('D3:H3');
        paymentsSheet.mergeCells('D4:H4');
        paymentsSheet.mergeCells('D5:H5');

        const bussinessNameCell = paymentsSheet.getCell('D2');
        const reportTypeCell = paymentsSheet.getCell('D3');
        const dateRangeCell = paymentsSheet.getCell('D4');
        const dateOfIssueCell = paymentsSheet.getCell('D5');

        const borders = {
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
        };

        bussinessNameCell.value = 'COLEGIO INGLÉS QUINTANA ROO, S.C ';
        reportTypeCell.value = 'TIPO DE REPORTE: Reporte de pagos';
        dateRangeCell.value = 'RANGO CONSULTADO: 2020-01-10 - 2020-01-10';
        dateOfIssueCell.value = 'FECHA DE EMISIÓN:' + new Date().toISOString().substr(0, 10);

        ['H2', 'H3', 'H4', 'H5'].map(key => {
            paymentsSheet.getCell(key).border = {
                right: { style: 'thin' },
            };
        });
        ['D2', 'D3', 'D4', 'D5'].map(key => {
            paymentsSheet.getCell(key).style = { alignment: { horizontal: 'center' } };
            if (key === 'D2') {
                paymentsSheet.getCell(key).border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' },
                };
            } else {
                paymentsSheet.getCell(key).border = {
                    left: { style: 'thin' },
                    right: { style: 'thin' },
                };
            }
        });
        dateOfIssueCell.border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };

        paymentsSheet.headerFooter.oddFooter = 'Página &P of &N en &F usando &"font name" de tamaño &"fint size"';

        const cashiers = [{ text: 'Tipo de pago' }, { text: 'Yaneli' }, { text: 'Amir' }, { text: 'Steeve' }, { text: 'Monto Total' }];
        const resumesByCashier = [{ type: 'Efectivo' }];

        let headers = new Array(9);
        headers = [...headers, ...cashiers];
        paymentsSheet.getRow(1).values = headers.map(value => value && value.text);

        const dynamicKeys = Array.from(Array(headers.length + 1).keys());

        dynamicKeys.map((colNumber, index) => {

            if (colNumber > 9) {
                paymentsSheet.getColumn(colNumber).width = 20;
                const editedCell = paymentsSheet.getRow(1).getCell(colNumber);
                editedCell.style = {
                    border: borders as Partial<Borders>,
                    alignment: { horizontal: 'center' },
                    font: {
                        name: 'Calibri',
                        color: { argb: 'FFFFFF' },
                        size: 14,
                    },
                    fill: {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: '1E88E5' },
                        bgColor: { argb: '1E88E5' },
                    },
                };
            }
            if (colNumber === 10) {
                paymentsSheet.getColumn(colNumber).width = 30;
            }
            if ((dynamicKeys.length - 1) === index) {
                paymentsSheet.getColumn(colNumber).width = 20;
            }
        });
        return workbook;
    }
}
