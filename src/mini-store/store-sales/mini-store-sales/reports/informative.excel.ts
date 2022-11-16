import {TableColumnProperties, Workbook, Worksheet} from 'exceljs';
import * as moment from 'moment';
import {IQueryReportInformative, IReportInformativeRow} from '../types/IReport';
import { getRangeDates } from './helpers';
import {TypeInformativeReport} from '../../../../common/enums/typeInformativeReport.enum';

const esMx = require('moment/locale/es-mx');

export class InformativeExcel {
    private rows: IReportInformativeRow[] = [];
    private rowsFolios: IReportInformativeRow[] = [];
    private params: IQueryReportInformative;
    private workbook: Workbook;


    constructor(
        params: IQueryReportInformative,
        data: IReportInformativeRow[] = [],
        dataFolios: IReportInformativeRow[] = []
    ) {
        this.rows = data;
        this.rowsFolios = dataFolios;
        this.params = params;

        this.workbook = new Workbook();

        this.config();
        this.generate(
            this.addWorksheet(
                `Informativo_de_productos${getRangeDates(this.params.startDate, this.params.endDate).excel}`,
            ),
        );
        this.generateFolio(
          this.addWorksheet(
              `Folios_de_productos${getRangeDates(this.params.startDate, this.params.endDate).excel}`,
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
            properties: { tabColor: { argb: '1226AA' } },
        });
    }

    private generate(worksheet: Worksheet): Worksheet {
        let columns: TableColumnProperties[] = [];
        if (this.params.type == TypeInformativeReport.PRODUCTS) {
            columns = [
                { name: 'Clasificación', filterButton: false },
                { name: 'Nombre del producto', filterButton: false },
                { name: 'Cantidad', filterButton: true },
                { name: 'Precio', filterButton: true },
                {
                    name: 'Subtotal',
                    filterButton: false,
                    totalsRowLabel: 'Total',
                    totalsRowFunction: 'sum',
                },
            ];
        } else if (this.params.type == TypeInformativeReport.CATEGORIES) {
            columns = [
                { name: 'Categoria', filterButton: false },
                { name: 'Cantidad de productos', filterButton: true },
                {
                    name: 'Subtotal',
                    filterButton: false,
                    totalsRowLabel: 'Total',
                    totalsRowFunction: 'sum',
                },
            ];
        } else if (this.params.type == TypeInformativeReport.CASHIERS) {
            columns = [
                {name: 'Realizado por', filterButton: false},
                {name: 'Productos vendidos', filterButton: true},
                {
                    name: 'Subtotal',
                    filterButton: false,
                    totalsRowLabel: 'Total',
                    totalsRowFunction: 'sum',
                },
            ];
        }

        worksheet.mergeCells(`B2:K2`);
        const title = worksheet.getCell('B2');
        title.value = `Reporte informativo${getRangeDates(this.params.startDate, this.params.endDate).title}`
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
            if (this.params.type == TypeInformativeReport.PRODUCTS) {
                columns.push(value.c_name_classification);
                columns.push(value.p_name_product);
                columns.push(parseInt(`${value.vd_quantity}`));
                columns.push(parseInt(`${value.vd_price}`));
                columns.push(value.subtotal);
                rows.push(columns);
            } else if (this.params.type == TypeInformativeReport.CATEGORIES) {
                columns.push(value.c_name_classification);
                columns.push(parseInt(`${value.vd_quantity}`));
                columns.push(value.subtotal);
                rows.push(columns);
            } else if (this.params.type == TypeInformativeReport.CASHIERS) {
                columns.push(value.u_fullname_agent);
                columns.push(parseInt(`${value.vd_quantity}`));
                columns.push(value.subtotal);
                rows.push(columns);
            }
        });

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

                if (column.letter === 'C' || column.letter === 'K') {
                    column.width = 45;
                }
            });

            return worksheet;
    }

    private generateFolio(worksheet: Worksheet): Worksheet {
        let columns: TableColumnProperties[] = [];
        if (this.params.type == TypeInformativeReport.PRODUCTS) {
            columns = [
                { name: 'Nombre del producto', filterButton: false },
                { name: 'Folio de venta', filterButton: false },
                { name: 'Folio de pago', filterButton: false },
            ];
        }

        worksheet.mergeCells(`B2:K2`);
        const title = worksheet.getCell('B2');
        title.value = `Folios de productos${getRangeDates(this.params.startDate, this.params.endDate).title}`
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
        this.rowsFolios.forEach((value: IReportInformativeRow) => {
            if (this.params.type == TypeInformativeReport.PRODUCTS) {
                const columns = [];
                columns.push(value.p_name_product);
                columns.push(value.v_folio_venta);
                columns.push(value.folios_ventas_pagos);
                rows.push(columns);
            }
        });

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

            if (column.letter === 'C' || column.letter === 'K') {
                column.width = 45;
            }
        });

        return worksheet;
    }

    public getWorkBook(): Workbook {
        return this.workbook;
    }
}