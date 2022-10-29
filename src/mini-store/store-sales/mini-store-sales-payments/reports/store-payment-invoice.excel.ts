import {TableColumnProperties, Workbook, Worksheet} from 'exceljs';
import {formatDate} from '../../../../common/date';
import * as moment from 'moment';
import {IQueryReportStorePayment, IReportStorePaymentRow} from '../types/IReports';
import {getNameReport} from '../../mini-store-sales/reports/helpers';

const esMx = require('moment/locale/es-mx');

export class StorePaymentInvoiceExcel {
    private rows: IReportStorePaymentRow[] = [];
    private params: IQueryReportStorePayment;
    private workbook: Workbook;

    constructor(params: IQueryReportStorePayment, data: IReportStorePaymentRow[] = []) {
        this.rows = data;
        this.params = params;

        this.workbook = new Workbook();

        this.config();
        this.generate(
            this.addWorksheet(
                `${getNameReport('Ingresos_facturados', this.params).excel}`,
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
                activeTab: 1,
                visibility: 'visible',
            },
        ];
    }

    private addWorksheet(name: string) {
        return this.workbook.addWorksheet(name, {
            properties: { tabColor: { argb: '1226AA' } },
        });
    }

    private generate(worksheet: Worksheet): Worksheet {
        let columns: TableColumnProperties[] = []

        columns = [
            { name: 'Folio de venta', filterButton: false },
            { name: 'Folio de pago', filterButton: false },
            { name: 'Clave', filterButton: true },
            { name: 'Nombre', filterButton: false },
            { name: 'Fecha de pago', filterButton: true },
            { name: 'Folio de factura', filterButton: false },
            { name: 'RFC', filterButton: false },
            { name: 'Fecha de facturación', filterButton: true },
            { name: 'Identificador único de factura', filterButton: false },
            { name: 'Identificador global de pago', filterButton: false },
            { name: 'Metodo de pago', filterButton: true },
            {
                name: 'Total del pago',
                filterButton: false,
                totalsRowLabel: 'Total',
                totalsRowFunction: 'sum',
            },
        ];

        worksheet.mergeCells(`B2:K2`);
        const title = worksheet.getCell('B2');
        title.value = `Reporte de ${getNameReport('ingresos facturados', this.params).title}`
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
        const rows = [];
        this.rows.forEach((value: IReportStorePaymentRow) => {
            const columns = [];
            columns.push(value.v_folio);
            columns.push(value.tvp_folio);
            columns.push(value.a_key);
            columns.push(value.a_fullname);
            columns.push(formatDate(value.tvp_created_at));
            columns.push(value.f_folio);
            columns.push(value.f_rfc);
            columns.push(formatDate(value.f_created_at));
            columns.push(value.f_uuid);
            columns.push(value.tvp_global_uuid);
            columns.push(value.f_metodo_pago);
            columns.push(parseFloat(`${value.p_income}`));
            rows.push(columns);
        });
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

    public getWorkBook(): Workbook {
        return this.workbook;
    }
}