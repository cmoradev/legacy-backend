import {TableColumnProperties, Workbook, Worksheet} from 'exceljs';
import {formatDate} from '../../../../common/date';
import * as moment from 'moment';
import {IQueryReportSaleTodayOp} from '../types/IReport';
import {getNameReport} from './helpers';
import {NotInvoiced} from '../../../../common/interface/not-invoiced.interface';

const esMx = require('moment/locale/es-mx');

export class SaleExcel {
    private rows: NotInvoiced[] = [];
    private params: IQueryReportSaleTodayOp;
    private workbook: Workbook;

    constructor(
        params: IQueryReportSaleTodayOp,
        data: NotInvoiced[] = [],
    ) {
        this.rows = data;
        this.params = params;

        this.workbook = new Workbook();

        this.config();
        this.generate(
            this.addWorksheet(
                `${getNameReport('Ventas', this.params).excel}`,
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
            properties: {tabColor: {argb: '1226AA'}},
        });
    }

    private generate(worksheet: Worksheet): Worksheet {
        let columns: TableColumnProperties[] = [];
        if (this.params.byClient) {
            columns = [
                { name: 'Matricula', filterButton: true },
                { name: 'Cliente', filterButton: false },
                { name: 'Numero de ventas', filterButton: false },
                {
                    name: 'Total del pago',
                    filterButton: false,
                    totalsRowLabel: 'Total',
                    totalsRowFunction: 'sum',
                },
                { name: 'Realizado por', filterButton: false },
            ];
        } else {
            columns = [
                { name: 'Matricula', filterButton: true },
                { name: 'Cliente', filterButton: false },
                { name: 'Fecha de creación', filterButton: true },
                { name: 'Folio de venta', filterButton: false },
                { name: 'Ciclo de venta', filterButton: false },
                { name: 'Vendedor', filterButton: false },
                { name: 'Cantidad', filterButton: false },
                { name: 'Productos', filterButton: false },
                { name: 'Precio', filterButton: false },
                {
                    name: 'Total del pago',
                    filterButton: false,
                    totalsRowLabel: 'Total',
                    totalsRowFunction: 'sum',
                },
                { name: 'Observaciones', filterButton: false },
            ];
        }

        worksheet.mergeCells(`B2:K2`);
        const title = worksheet.getCell('B2');
        title.value = `Reporte de ${getNameReport(this.params.byClient ? 'Ventas por cliente' : 'Ventas', this.params).title}`
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
        if (this.params.byClient) {
            this.rows.forEach((value: NotInvoiced) => {
                const columns = [];
                columns.push(value.a_key);
                columns.push(value.a_fullname);
                columns.push(value.count);
                columns.push(parseFloat(`${value.totalIVA}`));
                columns.push(value.vu_fullname_cashier);
                rows.push(columns);
            });
        } else {
            this.rows.forEach((value: NotInvoiced) => {
                const columns = [];
                columns.push(value.a_key);
                columns.push(value.a_fullname);
                columns.push(formatDate(value.vd_created_at));
                columns.push(value.v_folio);
                columns.push(value.v_cycle);
                columns.push(value.vu_fullname_cashier);
                columns.push(value.vd_quantity);
                columns.push(value.vd_product_name);
                columns.push(value.vd_price_IVA);
                columns.push(parseFloat(`${value.totalIVA}`));
                columns.push(value.v_observations);
                rows.push(columns);
            });
        }

        worksheet.addTable({
            displayName: 'Reporte',
            name: 'Reporte',
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