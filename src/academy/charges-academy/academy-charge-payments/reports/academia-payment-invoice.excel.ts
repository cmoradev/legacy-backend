import {TableColumnProperties, Workbook, Worksheet} from 'exceljs';
import {formatDate} from '../../../../common/date';
import * as moment from 'moment';
import {NotInvoiced} from '../../../../common/interface/not-invoiced.interface';
import {IQueryReportAcademiaPayment} from '../types/IReports';
import {getNameReport} from '../../../../mini-store/store-sales/mini-store-sales/reports/helpers';
import {AcademyChargePayments} from '../entities/academy-charge-payments.entity';
import {User} from '../../../../system/users/entities/user.entity';
import {
    InvoiceMethodPayment
} from '../../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { PaymentStatus } from '../../../../common/enums/PaymentStatus';

const esMx = require('moment/locale/es-mx');

export class AcademiaPaymentInvoiceExcel {
    private rows: NotInvoiced[] = [];
    private dataConverter: {
        matriz: any[][];
        data: {
            payments: AcademyChargePayments[],
            cashiers: User[],
            methodsPayments: InvoiceMethodPayment[]
        }
    }
    private params: IQueryReportAcademiaPayment;
    private workbook: Workbook;

    constructor(
        params: IQueryReportAcademiaPayment,
        data: NotInvoiced[] = [],
        dataConverter: {
            matriz: any[][];
            data: {
                payments: AcademyChargePayments[],
                cashiers: User[],
                methodsPayments: InvoiceMethodPayment[]
            }
        } = {
            matriz: [],
            data: {
                payments: [],
                cashiers: [],
                methodsPayments: []
            }
        }
    ) {
        this.rows = data;
        this.params = params;
        this.dataConverter = dataConverter;

        this.workbook = new Workbook();

        this.config();
        this.generate(
            this.addWorksheet(
                `${getNameReport('Pagos_Facturados', this.params).excel}`,
            ),
        );
        this.generateMatriz(
            this.addWorksheet(
                `${getNameReport('Matriz_de_pagos_facturados', this.params).excel}`,
            ),
        );
    }

    private config(): void {
        this.workbook.creator = 'Munyaal';
        this.workbook.created = new Date();

        this.workbook.views = [
            {
                x: 0,
                y: 0,
                width: 10000,
                height: 20000,
                firstSheet: 0,
                activeTab: 0,
                visibility: 'visible',
            },
        ];
    }

    private addWorksheet(name: string) {
        return this.workbook.addWorksheet(name, {
            properties: {tabColor: {argb: '1226AA'}},
        });
    }

    private generate(worksheet: Worksheet): Worksheet {
        let columns: TableColumnProperties[] = [];
        if(this.params.byClient){
            columns = [
                { name: 'Matricula', filterButton: true },
                { name: 'Nombre', filterButton: false },
                { name: 'Numero de ventas', filterButton: false },
                {
                    name: 'Total del pago',
                    filterButton: false,
                    totalsRowLabel: 'Total',
                    totalsRowFunction: 'sum',
                },
                { name: 'Realizado por', filterButton: false },
                { name: 'Cancelado por', filterButton: false },
            ];
        } else {
            columns = [
                {name: 'Folio de venta', filterButton: false},
                {name: 'Folio de pago', filterButton: false},
                {name: 'Clave', filterButton: true},
                {name: 'Nombre', filterButton: false},
                {name: 'Fecha de pago', filterButton: true},
                {name: 'Folio de factura', filterButton: false},
                {name: 'RFC', filterButton: false},
                {name: 'Fecha de facturación', filterButton: true},
                {name: 'Identificador único de factura', filterButton: false},
                {name: 'Identificador global de pago', filterButton: false},
                {name: 'Metodo de pago', filterButton: true},
                {
                    name: 'Total del pago',
                    filterButton: false,
                    totalsRowLabel: 'Total',
                    totalsRowFunction: 'sum',
                },
            ];
        }

        worksheet.mergeCells(`B2:K2`);
        const title = worksheet.getCell('B2');
        title.value = `Reporte de ${getNameReport(this.params.byClient ? 'Pagos facturados por cliente' : 'Pagos Facturados', this.params).title}`
        title.style = {
            alignment: {horizontal: 'center', vertical: 'middle'},
        };
        title.font = {
            bold: true,
            size: 16,
        };
        worksheet.mergeCells(`B3:K3`);
        const description = worksheet.getCell('B3');
        moment?.updateLocale('es', esMx);
        description.value = `Reporte emitido en ${moment().locale('es').format(
            'MMMM Do YYYY, h:mm:ss a',
        )}`;
        description.style = {
            alignment: {horizontal: 'center', vertical: 'middle'},
        };
        description.font = {
            bold: true,
            size: 12,
        };
        const rows = [];
        if(this.params.byClient){
            this.rows.forEach((value: NotInvoiced) => {
                const columns = [];
                columns.push(value.a_key);
                columns.push(value.a_fullname);
                columns.push(value.count);
                columns.push(parseFloat(`${value.p_income}`));
                columns.push(value.u_fullname_cashier);
                columns.push(value.us_fullname_cancelation);
                rows.push(columns);
            });
        } else {
            this.rows.forEach((value: NotInvoiced) => {
                const columns = [];
                columns.push(value.v_folio);
                columns.push(value.p_folio);
                columns.push(value.a_key);
                columns.push(value.a_fullname);
                columns.push(formatDate(value.p_created_at));
                columns.push(value.f_folio);
                columns.push(value.f_rfc);
                columns.push(formatDate(value.f_created_at));
                columns.push(value.f_uuid);
                columns.push(value.p_global_uuid);
                columns.push(value.f_metodo_pago);
                columns.push(parseFloat(`${value.p_income}`));
                rows.push(columns);
            });
        }

        worksheet.addTable({
            displayName: 'Reporte',
            name: 'Reporte',
            ref: 'B5',
            totalsRow: true,
            headerRow: true,
            style: {
                theme: 'TableStyleLight9',
                showRowStripes: true,
                showColumnStripes: true,
            },
            columns,
            rows,
        });

        worksheet.columns.forEach((column) => {
            column.width = 10;

            if (column.letter === 'K') {
                column.numFmt = '$#,##0.00';
            }
            if (column.letter === 'C' || column.letter === 'J') {
                column.width = 45;
            }

            if (column.letter === 'K') {
                column.width = 15;
            }
        });

        return worksheet;
    }

    private generateMatriz(worksheet: Worksheet): Worksheet{

        worksheet.mergeCells(`B2:K2`);
        const title = worksheet.getCell('B2');
        title.value = `${getNameReport('Matriz de pagos facturados', this.params).title}`
        title.style = {
            alignment: { horizontal: 'center', vertical: 'middle' },
        };
        title.font = {
            bold: true,
            size: 16,
        };
        worksheet.mergeCells(`B3:K3`);
        const description = worksheet.getCell('B3');
        moment?.updateLocale('es', esMx);
        description.value = `Reporte emitido en ${moment().locale('es').format(
            'MMMM Do YYYY, h:mm:ss a',
        )}`;
        description.style = {
            alignment: { horizontal: 'center', vertical: 'middle' },
        };
        description.font = {
            bold: true,
            size: 12,
        };

        const columns: TableColumnProperties[] = this.dataConverter.matriz[0].map((item) => {
            return{name: item, filterButton: false}
        });
        const dataMatriz = this.dataConverter.matriz.slice(1,this.dataConverter.matriz.length);
        const rows = [...dataMatriz.map((item) => item)];

        worksheet.addTable({
            displayName: 'Matriz',
            name: 'Matriz',
            ref: 'B5',
            totalsRow: false,
            headerRow: true,
            style: {
                theme: 'TableStyleLight9',
                showRowStripes: true,
                showColumnStripes: true,
            },
            columns,
            rows,
        });

        return worksheet;
    }

    public getWorkBook(): Workbook {
        return this.workbook;
    }
}
