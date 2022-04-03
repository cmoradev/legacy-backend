import * as Excel from 'exceljs';
import { Borders } from 'exceljs';
import { User } from '../../../../system/users/entities/user.entity';
import { InvoiceMethodPayment } from '../../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { SystemTypeExtraChargesEnum } from '../../../../system/system-type-extra-charges/entities/system-type-extra-charges.entity';
import { SchoolCharge } from '../../school-charges/entities/school-charge.entity';
import { SchoolChargePayment } from '../entities/school-charge-payment.entity';
import { totalAmountConceptAfterExtraCharge } from '../../../../common/point-of-sale/point-of-sale';

export class SimpleReportCollege {
    public generate(data: {
        payments: SchoolChargePayment[],
        cashiers: User[],
        paymentMethods: InvoiceMethodPayment[],
        sales: SchoolCharge[],
        query: any
    }): Excel.Workbook {
        const workbook = new Excel.Workbook();
        const { sales } = data;
        workbook.views = [
            {
                x: 0, y: 0, width: 10000, height: 20000,
                firstSheet: 0, activeTab: 2, visibility: 'visible',
            },
        ];

        const paymentsSheet = workbook.addWorksheet('Pagos', {
            properties:
            {
                tabColor: {
                    argb: '359c5b',
                },
            },
        });
        const salesSheet = workbook.addWorksheet('Cobros', {
            properties:
            {
                tabColor: {
                    argb: '1C86CA',
                },
            },
        });

        this.fillPaymentsSheet(paymentsSheet, data);
        this.fillSalesSheet(salesSheet, sales);

        return workbook;
    }

    public fillPaymentsSheet(paymentsSheet: Excel.Worksheet, data): Excel.Worksheet {
        const cashiers: User[] = data.cashiers;
        const payments: SchoolChargePayment[] = data.payments;
        const paymentMethods: InvoiceMethodPayment[] = data.paymentMethods;

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

        bussinessNameCell.value = 'COLEGIO';
        reportTypeCell.value = 'TIPO DE REPORTE: Reporte de pagos';
        dateRangeCell.value = `RANGO CONSULTADO: [${data.query.startDate} - ${data.query.endDate}]`;
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

        interface ResumeType {
            paymentMethod: InvoiceMethodPayment;
            cashier: User;
            quantity: number;
            change: number;
            total: number;
        }

        const resume: ResumeType[] = [];

        paymentMethods.forEach(paymentMethod => {
            const paymentsByMethod = payments.filter(payment => payment.methodsPayments
                .some(method => method.invoiceMethodPayment.id === paymentMethod.id));
            paymentsByMethod.forEach(payment => {
                payment.methodsPayments.filter(method => method.invoiceMethodPayment.id === paymentMethod.id)
                    .forEach(filteredMethod => {
                        const total = filteredMethod.quantity - (payment.change || 0);
                        resume.push({
                            paymentMethod,
                            cashier: payment.cashierCharge,
                            quantity: filteredMethod.quantity,
                            change: payment.change || 0,
                            total,
                        });
                    });
            });
        });

        const resumeDataTable = [];

        for (const paymentMethod of paymentMethods) {
            const resumeDataTableItem: any[] = [paymentMethod.name];
            for (const cashier of cashiers) {
                const filteredResume = resume.filter(value => value.paymentMethod.id === paymentMethod.id && value.cashier.id === cashier.id);
                resumeDataTableItem.push(filteredResume.reduce((previousValue, currentValue) => {
                    return previousValue + currentValue.total;
                }, 0));
            }
            resumeDataTableItem.push(resumeDataTableItem.reduce((previousValue, currentValue) => {
                let amount = 0;
                if (!isNaN(+currentValue)) {
                    amount = +currentValue;
                }
                return previousValue + amount;
            }, 0));

            resumeDataTable.push(resumeDataTableItem);
        }
        paymentsSheet.addTable({
            name: 'resumen',
            ref: 'F1',
            totalsRow: true,
            style: {
                showColumnStripes: true,
            },
            columns: [{
                name: 'Tipo',
                totalsRowLabel: 'Total global',
                filterButton: true,
            }, ...cashiers.map(value => {
                return {
                    name: value.name,
                    filterButton: false,
                    totalsRowFunction: 'sum' as 'sum',
                };
            }).concat({
                name: 'Total',
                totalsRowFunction: 'sum' as 'sum',
                filterButton: false,
            }),
            ],
            rows: resumeDataTable.map(value => value),
        });

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
            if (payment.schoolCharge) {
                const { name, lastNameFather, lastNameMother } = payment.schoolCharge.schoolStudent;
                const fullName = `${name.trim() || ''} ${lastNameFather.trim() || ''} ${lastNameMother.trim() || ''}`;
                /*const nextRowToMerge = startRow + (payment.methodsPayments.length) - 1;
                if (nextRowToMerge > startRow) {
                    ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'M'].forEach(column => {
                        paymentsSheet.mergeCells(`${column}${startRow}:${column}${nextRowToMerge}`);
                    });
                    startRow = nextRowToMerge;
                }*/
                payment.methodsPayments.forEach(paymentMethod => {
                    const paymentItem = [];
                    paymentItem.push(payment.createdAt || '');
                    paymentItem.push(payment.cashierCharge.name);
                    paymentItem.push(payment.stamping === 1 ? 'Si' : 'No');
                    paymentItem.push(payment.folio);
                    paymentItem.push(payment.schoolCharge.folio);
                    paymentItem.push(fullName);
                    paymentItem.push(payment.schoolCharge.observations || '');
                    paymentItem.push(paymentMethod?.invoiceMethodPayment?.name || '');
                    paymentItem.push(paymentMethod.quantity);
                    paymentsDetails.push(paymentItem);
                });
                startRow += 1;
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
                { name: 'Cliente' },
                { name: 'Observación' },
                { name: 'Formas de pago' },
                { name: 'Monto pagado', totalsRowFunction: 'sum' },
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

    public fillSalesSheet(salesSheet: Excel.Worksheet, sales: SchoolCharge[]): Excel.Worksheet {
        const salesRows = [];
        let startRow = 3;
        sales.forEach(sale => {
            const { schoolStudent } = sale;
            const { name, lastNameFather, lastNameMother } = schoolStudent;
            const fullName = `${name.trim() || ''} ${lastNameFather.trim() || ''} ${lastNameMother.trim() || ''}`;

            /*const nextRowToMerge = startRow + (sale.chargesDetails.length) - 1;
            if (nextRowToMerge > startRow) {
                ['B', 'C', 'D', 'E', 'F', 'G', 'K', 'L', 'M'].forEach(column => {
                    salesSheet.mergeCells(`${column}${startRow}:${column}${nextRowToMerge}`);
                });
                startRow = nextRowToMerge;
            }*/
            sale.chargesDetails.forEach(detail => {
                const salesRowItem: any[] = [];
                const productPrice = sale.iva ? +detail.price * 1.16 : +detail.price;
                // tslint:disable-next-line:no-unused-expression
                const recargos = productPrice - totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Recargos);
                const becas = productPrice - totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Becas);
                const descuentos = productPrice - totalAmountConceptAfterExtraCharge(detail, SystemTypeExtraChargesEnum.Descuentos);
                const totaldetail = productPrice + recargos - becas - descuentos;
                salesRowItem.push(sale.folio);
                salesRowItem.push(sale.createdAt);
                salesRowItem.push(fullName);
                salesRowItem.push(sale.cashier.name);
                salesRowItem.push(detail.quantity);
                salesRowItem.push(detail.concept);
                salesRowItem.push(productPrice);
                salesRowItem.push(descuentos);
                salesRowItem.push(becas);
                salesRowItem.push(recargos);
                salesRowItem.push(totaldetail);
                salesRowItem.push(sale.iva ? 'Si' : 'No');
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
                { name: 'Cliente' },
                { name: 'Vendedor' },
                { name: 'Cantidad' },
                { name: 'Productos' },
                { name: 'Precio', totalsRowLabel: 'Totales' },
                { name: 'Descuentos' },
                { name: 'Becas' },
                { name: 'recargos' },
                { name: 'Total' },
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
            if (colNumber > 1 && colNumber < 17) {
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


        return salesSheet;
    }
}
