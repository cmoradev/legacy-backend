import { TableColumnProperties, Workbook, Worksheet } from 'exceljs';
import { formatDate } from '../../../common/date';
import * as moment from 'moment';
import { NotInvoiced } from '../../../common/interface/not-invoiced.interface';
import { IQueryReportStorePayment } from '../../../mini-store/store-sales/mini-store-sales-payments/types/IReports';
import { getNameReport, getRangeDates } from '../../../mini-store/store-sales/mini-store-sales/reports/helpers';
import { InvoiceModules } from '../../../common/point-of-sale/types.pos';


const esMx = require('moment/locale/es-mx');

export class PaymentExcel {
    private rows: NotInvoiced[] = [];
    private dataMatriz: any[][];
    private params: IQueryReportStorePayment;
    private workbook: Workbook;
    private type: InvoiceModules;
    private typeReport: 'Ventas' | 'Pagos' | 'Pagos Facturados'

    constructor(
        params: IQueryReportStorePayment,
        data: NotInvoiced[] = [],
        dataMatriz: any[][] = [],
        type: InvoiceModules,
        typeReport: 'Ventas' | 'Pagos' | 'Pagos Facturados'
    ) {
        this.rows = data;
        this.params = params;
        this.dataMatriz = dataMatriz;
        this.type = type;
        this.typeReport = typeReport;

        this.workbook = new Workbook();

        this.config();
        this.generate(
            this.addWorksheet(
                `${getNameReport('Ingresos', this.params).excel}`,
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
        worksheet.mergeCells(`B2:K2`);
        const title = worksheet.getCell('B2');
        title.value = this.getTitleReport();
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
        const columns: TableColumnProperties[] = this.getColumnsTable();
        const rows = this.getRowsTable();

        const columnsMatriz: TableColumnProperties[] = this.dataMatriz[0].map((item) => {
            return { name: item, filterButton: false, }
        });
        const rowsMatriz = [...this.dataMatriz.slice(1, this.dataMatriz.length).map((item) => item)];

        worksheet.addTable({
            displayName: 'Matriz',
            name: 'Matriz',
            ref: `B5`,
            totalsRow: false,
            headerRow: true,
            style: {
                theme: 'TableStyleLight9',
                showRowStripes: true,
                showColumnStripes: true,
            },
            columns: columnsMatriz,
            rows: rowsMatriz,
        });

        worksheet.addTable({
            displayName: 'Reporte',
            name: 'Reporte',
            ref: `B${this.dataMatriz.length + 7}`,
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
            if (column.letter === 'B') {
                column.width = 20;
            }
            if (this.type == InvoiceModules.STORE) {
                if (this.typeReport == 'Pagos') {
                    if (column.letter === 'C' || column.letter === 'E' || column.letter === 'K' || column.letter === 'L') {
                        column.width = 40;
                    }
                    if (column.letter === 'D' || column.letter === 'F' || column.letter === 'G' || column.letter === 'H' || column.letter === 'I'
                        || column.letter === 'J' || column.letter === 'N' || column.letter === 'M' || column.letter === 'P' || column.letter === 'Q' || column.letter === 'R'
                        || column.letter === 'S') {
                        column.width = 20;
                    }
                } else if (this.typeReport == 'Pagos Facturados') {
                    if (column.letter === 'C' || column.letter === 'H' || column.letter === 'K' || column.letter === 'L') {
                        column.width = 40;
                    }
                    if (column.letter === 'D' || column.letter === 'E' || column.letter === 'F' || column.letter === 'I'
                        || column.letter === 'J' || column.letter === 'N' || column.letter === 'M' || column.letter === 'P' || column.letter === 'Q' || column.letter === 'R'
                        || column.letter === 'S') {
                        column.width = 20;
                    }
                }
            }

        });

        return worksheet;
    }

    public getWorkBook(): Workbook {
        return this.workbook;
    }

    public getTitleReport(): string {
        let text = '';
        switch (this.type) {
            case InvoiceModules.SCHOOL:
                text = 'Colegio: '
                break;
            case InvoiceModules.STORE:
                text = 'Tienda: '
                break;
            case InvoiceModules.ACADEMY:
                text = 'Academias: '
                break;
            default:
                break;
        }
        return `${text} Reporte de ${this.typeReport == 'Ventas' ? 'ventas' : this.typeReport} ${getNameReport(this.params.byClient ? 'por cliente' : '', this.params, this.typeReport == "Pagos Facturados").title}`
    }

    public getStatusFacturado(value: NotInvoiced): { name: string, value: string } {
        if (value.f_uuid != null) {
            return { name: 'Facturado', value: value.f_uuid }
        } else if (value.p_global_uuid != null) {
            return { name: 'Facturado global', value: value.p_global_uuid }
        } else {
            return { name: 'No facturado', value: '' }
        }
    }

    public getStatusVentaPago(value: any): string {
        if (value != null) {
            if (value == 1) {
                return 'Completo'
            } else if (value == 2) {
                return 'Completo diferido'
            } else {
                return 'Incompleto'
            }
        } else {
            return ''
        }
    }

    public getTipoClient(v: any): string {
        switch (v) {
            case "1":
                return "Alumno";
            case "2":
                return "Cliente";
            case "3":
                return "Prospecto";
            default:
                return '';
        }
    }

    public getColumnsTable(): TableColumnProperties[] {
        let columns: TableColumnProperties[] = [];
        if (this.params.byClient) {
            columns = [
                { name: 'Fecha de consulta', filterButton: false },
                { name: 'Tipo', filterButton: true },
                { name: 'Matricula', filterButton: true },
                { name: 'Nombre', filterButton: false },
                { name: 'Numero de ventas', filterButton: false },
                {
                    name: 'Total del pago',
                    filterButton: false,
                    totalsRowLabel: 'Total',
                    totalsRowFunction: 'sum',
                },
            ];
        } else {
            switch (this.typeReport) {
                case 'Pagos Facturados':
                    columns = [
                        { name: 'Fecha de creación', filterButton: false },
                        { name: 'Facturador', filterButton: true },
                        { name: 'Folio de venta', filterButton: false },
                        { name: 'Folio de pago', filterButton: false },
                        { name: 'Estatus venta/pago', filterButton: true },
                        { name: 'Folio factura', filterButton: false },
                        { name: 'Folio fiscal', filterButton: false },
                        { name: 'Tipo', filterButton: true },
                        { name: 'Matricula', filterButton: true },
                        { name: 'Nombre', filterButton: false },
                        { name: 'Observaciones', filterButton: false },
                        { name: 'Forma de pago', filterButton: true },
                        { name: 'Total venta', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Becas venta', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Descuentos venta iva', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Recargos venta', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Subtotal sin iva', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'IVA', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Subtotal IVA', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Monto pagado', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Cambio', filterButton: false, totalsRowFunction: 'sum' },
                    ];
                    if (this.type == InvoiceModules.STORE) {
                        const indexScholarships = columns.findIndex((c) => c.name == 'Becas venta')
                        columns.splice(indexScholarships, 1);
                        const indexSurcharges = columns.findIndex((c) => c.name == 'Recargos venta')
                        columns.splice(indexSurcharges, 1);
                    }
                    break;
                case 'Pagos':
                    columns = [
                        { name: 'Fecha de creación', filterButton: false },
                        { name: 'Vendedor', filterButton: true },
                        { name: 'Facturado', filterButton: true },
                        { name: 'Folio fiscal', filterButton: false },
                        { name: 'Folio de venta', filterButton: false },
                        { name: 'Folio de pago', filterButton: false },
                        { name: 'Estatus venta/pago', filterButton: true },
                        { name: 'Tipo', filterButton: true },
                        { name: 'Matricula', filterButton: true },
                        { name: 'Nombre', filterButton: false },
                        { name: 'Observaciones', filterButton: false },
                        { name: 'Forma de pago', filterButton: true },
                        { name: 'Total venta', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Becas venta', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Descuentos venta iva', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Recargos venta', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Subtotal sin iva', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'IVA', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Subtotal IVA', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Monto pagado', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Cambio', filterButton: false, totalsRowFunction: 'sum' },
                    ];
                    if (this.type == InvoiceModules.STORE) {
                        const indexScholarships = columns.findIndex((c) => c.name == 'Becas venta')
                        columns.splice(indexScholarships, 1);
                        const indexSurcharges = columns.findIndex((c) => c.name == 'Recargos venta')
                        columns.splice(indexSurcharges, 1);
                    }
                    break;
                case 'Ventas':

                    break;
                default:
                    break;
            }
        }
        return columns;
    }

    public getRowsTable() {
        const rows = [];
        if (this.params.byClient) {
            this.rows.forEach((value: NotInvoiced) => {
                const columns = [];
                columns.push(formatDate(getRangeDates(this.params.startDate, this.params.endDate).excel))
                columns.push(value.a_tipo);
                columns.push(value.a_key);
                columns.push(value.a_fullname);
                columns.push(parseFloat(`${value.count}`));
                columns.push(parseFloat(`${value.p_income}`));
                rows.push(columns);
            });
        } else {
            if (this.type == InvoiceModules.STORE) {
                this.rows.forEach((value: NotInvoiced) => {
                    const columns = [];
                    switch (this.typeReport) {
                        case 'Pagos Facturados':
                            columns.push(value.p_created_at);
                            columns.push(value.fu_fullname_cashier);
                            columns.push(value.v_folio);
                            columns.push(value.p_folio);
                            columns.push(this.getStatusVentaPago(value.p_status_Global));
                            columns.push(value.f_folio);
                            columns.push(this.getStatusFacturado(value).value);
                            columns.push(this.getTipoClient(value.a_tipo));
                            columns.push(value.a_key);
                            columns.push(value.a_fullname);
                            columns.push(value.v_observations);
                            columns.push(value.p_metodo_pago);
                            columns.push(parseFloat(`${value.total}`));
                            columns.push(parseFloat(`${value.charges.discounts}`));
                            columns.push(parseFloat(`${value.totals.totalWithoutIVA}`));
                            columns.push(parseFloat(`${value.totals.IVA}`));
                            columns.push(parseFloat(`${value.p_income}`));
                            columns.push(parseFloat(`${value.p_quantity}`));
                            columns.push(parseFloat(`${value.p_change}`));
                            break;
                        case 'Pagos':
                            columns.push(value.p_created_at);
                            columns.push(value.vu_fullname_cashier);
                            columns.push(this.getStatusFacturado(value).name);
                            columns.push(this.getStatusFacturado(value).value);
                            columns.push(value.v_folio);
                            columns.push(value.p_folio);
                            columns.push(this.getStatusVentaPago(value.p_status_Global));
                            columns.push(this.getTipoClient(value.a_tipo));
                            columns.push(value.a_key);
                            columns.push(value.a_fullname);
                            columns.push(value.v_observations);
                            columns.push(value.p_metodo_pago);
                            columns.push(parseFloat(`${value.total}`));
                            columns.push(parseFloat(`${value.charges.discounts}`));
                            columns.push(parseFloat(`${value.totals.totalWithoutIVA}`));
                            columns.push(parseFloat(`${value.totals.IVA}`));
                            columns.push(parseFloat(`${value.p_income}`));
                            columns.push(parseFloat(`${value.p_quantity}`));
                            columns.push(parseFloat(`${value.p_change}`));
                            break;
                        case 'Ventas':

                            break;
                        default:
                            break;
                    }

                    rows.push(columns);
                });
            } else {
                this.rows.forEach((value: NotInvoiced) => {
                    const columns = [];
                    switch (this.typeReport) {
                        case 'Pagos Facturados':
                            columns.push(value.p_created_at);
                            columns.push(this.type == InvoiceModules.ACADEMY ? value.u_fullname_cashier : value.vu_fullname_cashier);
                            columns.push(value.v_folio);
                            columns.push(value.p_folio);
                            columns.push(this.getStatusVentaPago(value.p_status_Global));
                            columns.push(value.f_folio);
                            columns.push(this.getStatusFacturado(value).value);
                            columns.push(this.getTipoClient(value.a_tipo));
                            columns.push(value.a_key);
                            columns.push(value.a_fullname);
                            columns.push(value.v_observations);
                            columns.push(value.p_metodo_pago);
                            columns.push(parseFloat(`${value.total}`));
                            columns.push(parseFloat(`${value.charges.scholarships}`));
                            columns.push(parseFloat(`${value.charges.discounts}`));
                            columns.push(parseFloat(`${value.charges.surcharges}`));
                            columns.push(parseFloat(`${value.totals.totalWithoutIVA}`));
                            columns.push(parseFloat(`${value.totals.IVA}`));
                            columns.push(parseFloat(`${value.p_income}`));
                            columns.push(parseFloat(`${value.p_quantity}`));
                            columns.push(parseFloat(`${value.p_change}`));
                            break;
                        case 'Pagos':
                            columns.push(value.p_created_at);
                            columns.push(this.type == InvoiceModules.ACADEMY ? value.u_fullname_cashier : value.vu_fullname_cashier);
                            columns.push(this.getStatusFacturado(value).name);
                            columns.push(this.getStatusFacturado(value).value);
                            columns.push(value.v_folio);
                            columns.push(value.p_folio);
                            columns.push(this.getStatusVentaPago(value.p_status_Global));
                            columns.push(this.getTipoClient(value.a_tipo));
                            columns.push(value.a_key);
                            columns.push(value.a_fullname);
                            columns.push(value.v_observations);
                            columns.push(value.p_metodo_pago);
                            columns.push(parseFloat(`${value.total}`));
                            columns.push(parseFloat(`${value.charges.scholarships}`));
                            columns.push(parseFloat(`${value.charges.discounts}`));
                            columns.push(parseFloat(`${value.charges.surcharges}`));
                            columns.push(parseFloat(`${value.totals.totalWithoutIVA}`));
                            columns.push(parseFloat(`${value.totals.IVA}`));
                            columns.push(parseFloat(`${value.p_income}`));
                            columns.push(parseFloat(`${value.p_quantity}`));
                            columns.push(parseFloat(`${value.p_change}`));
                            break;
                        case 'Ventas':

                            break;
                        default:
                            break;
                    }

                    rows.push(columns);
                });
            }
        }
        return rows;
    }
}

