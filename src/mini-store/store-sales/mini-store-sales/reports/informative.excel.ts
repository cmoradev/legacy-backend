import { TableColumnProperties, Workbook, Worksheet } from 'exceljs';
import * as moment from 'moment';
import {IQueryReportSaleToday, IReportInformativeRow} from '../types/IReport';
import { getNameReport } from './helpers';
import {formatDate} from '../../../../common/date';

const esMx = require('moment/locale/es-mx');

export class InformativeExcel {
    private rows: IReportInformativeRow[] = [];
    private params: IQueryReportSaleToday;
    private workbook: Workbook;

    constructor(params: IQueryReportSaleToday, data: IReportInformativeRow[] = []) {
        this.rows = data;
        this.params = params;

        this.workbook = new Workbook();

        this.config();
        this.generate(
            this.addWorksheet(
                `${getNameReport('Información_producto',this.params).excel}`,
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
            { name: 'Fecha de creación', filterButton: true },
            { name: 'Folio de venta', filterButton: false },
            { name: 'Nombre del producto', filterButton: false },
            { name: 'Clasificación', filterButton: false },
            { name: 'Realizado por', filterButton: false },
            { name: 'Folio de pago venta', filterButton: false },
            {
                name: 'Subtotal',
                filterButton: false,
                totalsRowLabel: 'Total',
                totalsRowFunction: 'sum',
            },
        ];

        worksheet.mergeCells(`B2:K2`);
        const title = worksheet.getCell('B2');
        title.value = `Reporte de ${getNameReport('Información_producto',this.params).title}`
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

        this.rows.forEach((value: IReportInformativeRow) => {
            const columns = [];
            columns.push(formatDate(value.v_createdAt));
            columns.push(value.v_folio_venta);
            columns.push(value.p_name_product);
            columns.push(value.c_name_classification);
            columns.push(value.u_fullname_agent);
            columns.push(value.folios_ventas_pagos);
            columns.push(parseFloat(`${value.subtotal}`));
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