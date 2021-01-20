import * as Excel from 'exceljs';
import { Borders } from 'exceljs';
import { MiniStoreSalePayment } from '../entities/mini-store-sale-payment.entity';
import { User } from '../../../../system/users/entities/user.entity';
import { InvoiceMethodPayment } from '../../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { TypeStudent } from '../../../../school-colegio-ingles/students/interface/studentsSchool.interface';
import { MiniStoreSale } from '../../mini-store-sales/entities/mini-store-sale.entity';
import { SalesReturns } from '../../mini-store-sales-returns/entities/sales-returns.entity';
import { CellRow } from '../utils/generate-matriz-by-payment';

export class SimpleReport {

    public generate(data: {
        payments: MiniStoreSalePayment[],
        cashiers: User[],
        salesReturns: SalesReturns[],
        paymentMethods: InvoiceMethodPayment[],
        sales: MiniStoreSale[],
    }, matriz: CellRow[][]): Excel.Workbook {
        const workbook = new Excel.Workbook();
        const { sales, salesReturns } = data;
        workbook.views = [
            {
                x: 0, y: 0, width: 10000, height: 20000,
                firstSheet: 0, activeTab: 2, visibility: 'visible',
            },
        ];

        const image = workbook.addImage({
            filename: './public/images/little-store-logo.png',
            extension: 'png',
        });

        const paymentsSheet = workbook.addWorksheet('Pagos', {
            properties:
              {
                  tabColor: {
                      argb: '359c5b',
                  },
              },
        });
        const salesSheet = workbook.addWorksheet('Ventas', {
            properties:
              {
                  tabColor: {
                      argb: '1C86CA',
                  },
              },
        });

        const salesReturnsSheet = workbook.addWorksheet('Devoluciones', {
            properties:
              {
                  tabColor: {
                      argb: 'E53935',
                  },
              },
        });
        this.fillPaymentsSheet(paymentsSheet, image, data, matriz);
        this.fillSalesSheet(salesSheet, sales);
        this.fillSalesReturnsSheet(salesReturnsSheet, salesReturns);

        return workbook;
    }

    public fillPaymentsSheet(paymentsSheet: Excel.Worksheet, imageID, data, matriz: CellRow[][]): Excel.Worksheet {
        const { cashiers, payments, paymentMethods } = data;
        paymentsSheet.addImage(imageID, { ext: { height: 100, width: 90 }, tl: { col: 1, row: 1 } });
        paymentsSheet.mergeCells('C2:D2');
        paymentsSheet.mergeCells('C3:D3');
        paymentsSheet.mergeCells('C4:D4');
        paymentsSheet.mergeCells('C5:D5');

        const bussinessNameCell = paymentsSheet.getCell('C2');
        const reportTypeCell = paymentsSheet.getCell('C3');
        const dateRangeCell = paymentsSheet.getCell('C4');
        const dateOfIssueCell = paymentsSheet.getCell('C5');

        const borders = {
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
        };

        bussinessNameCell.value = 'QUINTANA ROO, S.C ';
        reportTypeCell.value = 'TIPO DE REPORTE: Reporte de pagos';
        dateRangeCell.value = 'RANGO CONSULTADO: *';
        dateOfIssueCell.value = 'FECHA DE EMISIÓN:' + new Date().toISOString().substr(0, 10);

        ['D2', 'D3', 'D4', 'D5'].map(key => {
            paymentsSheet.getCell(key).border = {
                right: { style: 'thin' },
            };
        });
        ['C2', 'C3', 'C4', 'C5'].map(key => {
            paymentsSheet.getCell(key).style = { alignment: { horizontal: 'center' } };
            if (key === 'C2') {
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

        const emptySpacesResume = new Array(5);
        const headers = [...emptySpacesResume, { name: 'Tipo' }, ...cashiers, { name: 'Total' }];

        paymentsSheet.getRow(1).values = headers.map((value: User) => value && value.name);
        const dynamicKeys = Array.from(Array(headers.length + 1).keys());

        const tableHead = matriz[0];
        matriz.shift();
        matriz.pop();
        paymentsSheet.addTable({
            name: 'resumen',
            ref: 'F1',
            totalsRow: true,
            style: {
                showColumnStripes: true,
            },
            columns: tableHead.map((head, i) => {
                if (i === 0) {
                    return {
                        name: 'Tipo',
                        totalsRowLabel: 'Total global',
                        filterButton: true,
                    };
                } else if (i === matriz[0].length) {
                    return {
                        name: 'Total',
                        totalsRowFunction: 'sum' as 'sum',
                        filterButton: false,
                    };
                } else {
                    return {
                        name: head.value,
                        filterButton: false,
                        totalsRowFunction: 'sum' as 'sum',
                    };
                }
            }),
            rows: matriz.map((value, i) => {
                const newList = [];
                let k = 0;
                for (const val of value) {
                    newList.push(val.value);
                    k++;
                }
                return newList;
            }),
        })
        ;

        for (const row of Array.from(Array(2 + paymentMethods.length + 1).keys())) {
            if (row >= 2) {
                paymentsSheet.getRow(row).eachCell((cell, colNumber) => {
                    if (colNumber > 6) {
                        cell.numFmt = '"$"#,##0.00;[Red]\-"$"#,##0.00';
                    }
                });
            }
        }

        dynamicKeys.map((colNumber, index) => {

            if (colNumber > 5) {
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

        const paymentsDetails = [];
        let startRow = 15;
        payments.forEach(payment => {
            if (payment.miniStoreSale) {
                const { name, lastNameFather, lastNameMother } = payment.miniStoreSale.student;
                const fullName = `${name.trim() || ''} ${lastNameFather.trim() || ''} ${lastNameMother.trim() || ''}`;
                const nextRowToMerge = startRow + (payment.miniStoreSaleMethodPayments.length) - 1;
                if (nextRowToMerge > startRow) {
                    ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'M'].forEach(column => {
                        paymentsSheet.mergeCells(`${column}${startRow}:${column}${nextRowToMerge}`);
                    });
                    startRow = nextRowToMerge;
                }
                payment.miniStoreSaleMethodPayments.forEach(paymentMethod => {
                    const paymentItem = [];
                    const totalPaymentsAmount = payment.miniStoreSaleMethodPayments.reduce((previousValue, currentValue) => {
                        return previousValue + currentValue.quantity;
                    }, 0);
                    paymentItem.push(payment.createdAt || '');
                    paymentItem.push(payment.agent.name);
                    paymentItem.push(payment.stamping === 1 ? 'Si' : 'No');
                    paymentItem.push(payment.folio);
                    paymentItem.push(payment.miniStoreSale.folio);
                    paymentItem.push(payment.miniStoreSale.student.matricula);
                    paymentItem.push(fullName);
                    paymentItem.push(payment.miniStoreSale.observations || '');
                    paymentItem.push(paymentMethod?.invoiceMethod?.name || '');
                    paymentItem.push(paymentMethod.quantity);
                    paymentItem.push(payment.change);
                    paymentItem.push(totalPaymentsAmount - payment.change);
                    paymentsDetails.push(paymentItem);
                });
                startRow += 1;
            } else {
                console.log(payment);
            }
        });

        paymentsSheet.addTable({
            name: 'details',
            ref: 'B14',
            totalsRow: true,
            columns: [
                { name: 'Fecha', filterButton: false },
                { name: 'Vendedor' },
                { name: 'Facturado' },
                { name: 'Folio de pago' },
                { name: 'Folio de venta' },
                { name: 'Matricula' },
                { name: 'Cliente' },
                { name: 'Observación' },
                { name: 'Formas de pago' },
                { name: 'Monto pagado', totalsRowFunction: 'sum' },
                { name: 'Cambio', totalsRowFunction: 'sum' },
                { name: 'Total', totalsRowFunction: 'sum' },
            ],
            rows: paymentsDetails,
        });

        paymentsSheet.getRow(14).eachCell((cell, colNumber) => {
            if (colNumber > 1 && colNumber < 14) {
                paymentsSheet.getColumn(colNumber).width = colNumber === 2 ? 15 : 20;
                paymentsSheet.getColumn(colNumber).width = colNumber === 3 ? 25 : 20;
                paymentsSheet.getColumn(colNumber).width = colNumber === 8 ? 35 : 20;

                cell.style = {
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
        });

        paymentsSheet.eachRow((row, rowNumber) => {
            if (rowNumber > 14) {
                row.eachCell(cell => {
                    cell.style = {
                        alignment: { vertical: 'middle', horizontal: 'center' },
                        border: borders as Partial<Borders>,
                    };
                });
            }
        });
        for (let row = 15; row <= paymentsDetails.length + 15; row++) {
            paymentsSheet.getRow(row).eachCell((cell, colNumber) => {
                if (colNumber > 10 && colNumber < 14) {
                    cell.numFmt = '"$"#,##0.00;[Red]\-"$"#,##0.00';
                }
            });
        }
        return paymentsSheet;
    }

    public fillSalesSheet(salesSheet: Excel.Worksheet, sales: MiniStoreSale[]): Excel.Worksheet {
        const salesRows = [];
        let startRow = 3;
        sales.forEach(sale => {
            const { student } = sale;
            const { name, lastNameFather, lastNameMother } = student;
            const fullName = `${name.trim() || ''} ${lastNameFather.trim() || ''} ${lastNameMother.trim() || ''}`;
            let studentType = '';
            switch (student.typeStudent) {
                case TypeStudent.student:
                    studentType = 'Alumno';
                    break;
                case TypeStudent.externo:
                    studentType = 'Externo';
                    break;
                default:
                    studentType = 'Prospecto';
                    break;
            }

            const nextRowToMerge = startRow + (sale.miniStoreSaleDetails.length) - 1;
            if (nextRowToMerge > startRow) {
                ['B', 'C', 'D', 'E', 'F', 'G','J', 'K', 'L', ].forEach(column => {
                    salesSheet.mergeCells(`${column}${startRow}:${column}${nextRowToMerge}`);
                });
                startRow = nextRowToMerge;
            }
            const totalSale = sale.miniStoreSaleDetails.reduce((previousValue, currentValue) => {
                const productPrice = currentValue.miniStoreProduct.IVA ? currentValue.priceWithIVA : +currentValue.price;
                return previousValue + (productPrice * parseFloat(currentValue.quantity.toString()));
            }, 0);
            sale.miniStoreSaleDetails.forEach(detail => {
                const salesRowItem: any[] = [];
                const productPrice = detail.miniStoreProduct.IVA ? detail.priceWithIVA : +detail.price;
                salesRowItem.push(sale.folio);
                salesRowItem.push(sale.createdAt);
                salesRowItem.push(student.matricula);
                salesRowItem.push(fullName);
                salesRowItem.push(sale.cashier.name);
                salesRowItem.push(detail.quantity);
                salesRowItem.push(detail.miniStoreProduct.name);
                salesRowItem.push(productPrice);
                salesRowItem.push(totalSale);
                salesRowItem.push(detail.miniStoreProduct.IVA ? 'Si' : 'No');
                salesRowItem.push(sale.observations ? sale.observations : '');
                salesRows.push(salesRowItem);
            });
            startRow += 1;
        });

        salesSheet.addTable({
            name: 'sales',
            ref: 'B2',
            totalsRow: true,
            columns: [
                { name: 'Folio' },
                { name: 'Fecha' },
                { name: 'Matricula' },
                { name: 'Cliente' },
                { name: 'Vendedor' },
                { name: 'Cantidad' },
                { name: 'Productos' },
                { name: 'Precio', totalsRowLabel: 'Totales' },
                { name: 'Total', totalsRowFunction: 'sum' },
                { name: 'Incluye I.V.A' },
                { name: 'Observación' },
            ],
            rows: salesRows,
        });

        const borders = {
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
        };
        salesSheet.getRow(2).eachCell((cell, colNumber) => {
            if (colNumber > 1 && colNumber < 14) {
                salesSheet.getColumn(colNumber).width = 25;
                cell.style = {
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
        });

        salesSheet.eachRow((row, rowNumber) => {
            if (rowNumber > 2) {
                row.eachCell(cell => {
                    cell.style = {
                        alignment: { vertical: 'middle', horizontal: 'center' },
                        border: borders as Partial<Borders>,
                    };
                });
            }
        });
        for (let row = 3; row <= salesRows.length + 3; row++) {
            salesSheet.getRow(row).eachCell((cell, colNumber) => {
                if (colNumber > 9 && colNumber < 12) {
                    cell.numFmt = '"$"#,##0.00;[Red]\-"$"#,##0.00';
                }
            });
        }
        return salesSheet;
    }

    public fillSalesReturnsSheet(salesSheetReturns: Excel.Worksheet, salesReturns: SalesReturns[]) {
        const salesSheetRows = [];
        const borders = {
            right: { style: 'thin' },
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
        };

        salesReturns.forEach(saleReturn => {
            const salesSheetItem = [];
            const { lastNameFather, name, lastNameMother, typeStudent, matricula } = saleReturn.sale.student;
            const fullName = `${name.trim() || ''} ${lastNameFather.trim() || ''} ${lastNameMother.trim() || ''}`;
            salesSheetItem.push(saleReturn.createdAt);
            salesSheetItem.push(saleReturn.agent.name || '');
            salesSheetItem.push(saleReturn.folio || '');
            salesSheetItem.push(saleReturn.sale.folio);
            salesSheetItem.push(matricula);
            salesSheetItem.push(fullName);
            salesSheetItem.push(saleReturn.comments);
            salesSheetItem.push(saleReturn.paymentMethod.name || '');
            salesSheetItem.push(parseFloat(saleReturn.amount));
            salesSheetRows.push(salesSheetItem);
        });
        salesSheetReturns.addTable({
            name: 'salesReturns',
            ref: 'B2',
            totalsRow: true,
            columns: [
                { name: 'Fecha' },
                { name: 'Agente' },
                { name: 'Folio de devolución' },
                { name: 'Folio de venta' },
                { name: 'Matricula' },
                { name: 'Cliente' },
                { name: 'Observación' },
                { name: 'Forma' },
                {
                    name: 'Monto',
                    totalsRowFunction: 'sum',
                },
            ],
            rows: salesSheetRows,
        });

        ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'].forEach(column => {
            salesSheetReturns.getColumn(column).width = 25;
            if (column === 'K') {
                salesSheetReturns.getColumn(column).eachCell((cell, cellNumber) => {
                    if (cellNumber > 2) {
                        cell.numFmt = '"$"#,##0.00;[Red]\-"$"#,##0.00';
                    }
                });
            }
            salesSheetReturns.getColumn(column).eachCell(cell => {
                cell.style = {
                    ...cell.style,
                    border: borders as Partial<Borders>,
                    alignment: { horizontal: 'center', vertical: 'middle' },
                };
            });
        });
        salesSheetReturns.getRow(2).eachCell((cell) => {
            cell.style = {
                border: borders as Partial<Borders>,
                alignment: { horizontal: 'center', vertical: 'middle' },
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

        });
    }
}
