import * as Excel from 'exceljs';
import { Borders } from 'exceljs';
import { User } from '../../../../system/users/entities/user.entity';
import { InvoiceMethodPayment } from '../../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { TypeStudent } from '../../../../school-colegio-ingles/students/interface/studentsSchool.interface';
import { AcademyChargePayments } from '../entities/academy-charge-payments.entity';
import { AcademyCharge } from '../../academy-charge/entities/academy-charge.entity';

export class SimpleReportAcademy {
    public generate(data: {
        payments: AcademyChargePayments[],
        cashiers: User[],
        paymentMethods: InvoiceMethodPayment[],
        sales: AcademyCharge[],
    }): Excel.Workbook {
        const workbook = new Excel.Workbook();
        const { sales } = data;
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

        this.fillPaymentsSheet(paymentsSheet, image, data);
        this.fillSalesSheet(salesSheet, sales);

        return workbook;
    }

    public fillPaymentsSheet(paymentsSheet: Excel.Worksheet, imageID, data): Excel.Worksheet {
        const cashiers: User[] = data.cashiers;
        const payments: AcademyChargePayments[] = data.payments;
        const paymentMethods: InvoiceMethodPayment[] = data.paymentMethods;

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

        bussinessNameCell.value = 'COLEGIO INGLÉS QUINTANA ROO, S.C ';
        reportTypeCell.value = 'TIPO DE REPORTE: Reporte de pagos';
        dateRangeCell.value = 'RANGO CONSULTADO: 2020-01-10 - 2020-01-10';
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
            if (payment.academyCharge) {
                const { name, lastNameFather, lastNameMother } = payment.academyCharge.schoolStudent;
                const fullName = `${name.trim() || ''} ${lastNameFather.trim() || ''} ${lastNameMother.trim() || ''}`;
                let studentType = '';
                switch (payment.academyCharge.schoolStudent.typeStudent) {
                    case TypeStudent.externo:
                        studentType = 'Externo';
                        break;
                    case TypeStudent.student:
                        studentType = 'Alumno';
                        break;
                    default:
                        studentType = 'Prospecto';
                        break;
                }
                const nextRowToMerge = startRow + (payment.methodsPayments.length) - 1;
                if (nextRowToMerge > startRow) {
                    ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'M'].forEach(column => {
                        paymentsSheet.mergeCells(`${column}${startRow}:${column}${nextRowToMerge}`);
                    });
                    startRow = nextRowToMerge;
                }
                payment.methodsPayments.forEach(paymentMethod => {
                    const paymentItem = [];
                    const totalPaymentsAmount = payment.methodsPayments.reduce((previousValue, currentValue) => {
                        return previousValue + currentValue.quantity;
                    }, 0);
                    paymentItem.push(payment.createdAt || '');
                    paymentItem.push(payment.cashierCharge.name);
                    paymentItem.push(payment.stamping === 1 ? 'Si' : 'No');
                    paymentItem.push(payment.folio);
                    paymentItem.push(payment.academyCharge.folio);
                    paymentItem.push(studentType);
                    paymentItem.push(payment.academyCharge.schoolStudent.matricula);
                    paymentItem.push(fullName);
                    paymentItem.push(payment.academyCharge.observations || '');
                    paymentItem.push(paymentMethod?.invoiceMethodPayment?.name || '');
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
                { name: 'Tipo' },
                { name: 'Matricula' },
                { name: 'Alumno/Cliente' },
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

    public fillSalesSheet(salesSheet: Excel.Worksheet, sales: AcademyCharge[]): Excel.Worksheet {
        const salesRows = [];
        let startRow = 3;
        sales.forEach(sale => {
            const { schoolStudent } = sale;
            const { name, lastNameFather, lastNameMother } = schoolStudent;
            const fullName = `${name.trim() || ''} ${lastNameFather.trim() || ''} ${lastNameMother.trim() || ''}`;
            let studentType = '';
            switch (schoolStudent.typeStudent) {
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

            const nextRowToMerge = startRow + (sale.chargesDetails.length) - 1;
            if (nextRowToMerge > startRow) {
                ['B', 'C', 'D', 'E', 'F', 'G', 'K', 'L', 'M'].forEach(column => {
                    salesSheet.mergeCells(`${column}${startRow}:${column}${nextRowToMerge}`);
                });
                startRow = nextRowToMerge;
            }
            const totalSale = sale.chargesDetails.reduce((previousValue, currentValue) => {
                const productPrice = sale.isIva ? +currentValue.price * 1.16 : +currentValue.price;
                return previousValue + (productPrice * parseFloat(currentValue.quantity.toString()));
            }, 0);
            sale.chargesDetails.forEach(detail => {
                const salesRowItem: any[] = [];
                const productPrice = sale.isIva ? +detail.price * 1.16 : +detail.price;
                salesRowItem.push(sale.folio);
                salesRowItem.push(sale.createdAt);
                salesRowItem.push(studentType);
                salesRowItem.push(schoolStudent.matricula);
                salesRowItem.push(fullName);
                salesRowItem.push(sale.cashier.name);
                salesRowItem.push(detail.quantity);
                salesRowItem.push(detail.concept);
                salesRowItem.push(productPrice);
                salesRowItem.push(totalSale);
                salesRowItem.push(sale.isIva ? 'Si' : 'No');
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
                { name: 'Persona' },
                { name: 'Matricula' },
                { name: 'Alumno/Cliente' },
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
}
