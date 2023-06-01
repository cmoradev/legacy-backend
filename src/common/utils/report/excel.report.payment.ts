import { TableColumnProperties, Workbook, Worksheet } from 'exceljs';
import { formatDate } from '../../../common/date';
import * as moment from 'moment';
import { PaymentExtraCharge } from '../../../common/interface/not-invoiced.interface';
import { IQueryReportStorePayment } from '../../../mini-store/store-sales/mini-store-sales-payments/types/IReports';
import { getNameReport, getRangeDates } from '../../../mini-store/store-sales/mini-store-sales/reports/helpers';
import { InvoiceModules } from '../../../common/point-of-sale/types.pos';


const esMx = require('moment/locale/es-mx');

export class PaymentExcel {
    private rows: PaymentExtraCharge[] = [];
    private dataMatriz: any[][];
    private params: IQueryReportStorePayment;
    private workbook: Workbook;
    private type: InvoiceModules;
    private typeReport: 'Ventas' | 'Pagos' | 'Pagos Facturados'

    constructor(
        params: IQueryReportStorePayment,
        data: PaymentExtraCharge[] = [],
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
                `${this.typeReport} ${getRangeDates(this.params.startDate, this.params.endDate).excel}`,
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

        if(this.typeReport != 'Ventas'){
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
        }

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
            } else {
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

            if(this.typeReport == 'Ventas'){
                if (column.letter === 'C' || column.letter === 'F' || column.letter === 'H' || column.letter === 'I') {
                    column.width = 40;
                }  
                if (column.letter === 'D' || column.letter === 'E' || column.letter === 'G') {
                    column.width = 20;
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

    public getStatusFacturado(value: PaymentExtraCharge): { name: string, value: string } {
        if (value.p_state == 2) {
            if (value.f_uuid != null) {
                return { name: 'Facturado', value: value.f_uuid }
            } else if (value.p_global_uuid != null) {
                return { name: 'Facturado global', value: value.p_global_uuid }
            } else {
                return { name: 'No facturado', value: '' }
            }
        } else {
            return { name: 'N/A', value: 'N/A' }
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

    public getStatusVentaPagoSale(value: any): string {
        if (value != null) {
            if (value == 1) {
                return 'Completo'
            } else if (value == 2) {
                return 'Incompleto con pagos'
            } else {
                return 'Incompleto sin pagos'
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
                        { name: 'Usuario', filterButton: true },
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
                        { name: 'Descuentos venta', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Recargos venta', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Subtotal sin iva', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'IVA', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Subtotal IVA', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Monto pagado', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Cambio', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Subtotal', filterButton: false, totalsRowFunction: 'sum' },
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
                        { name: 'Usuario', filterButton: true },
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
                        { name: 'Descuentos venta', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Recargos venta', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Subtotal sin IVA', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'IVA', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Subtotal IVA', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Monto pagado', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Cambio', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Subtotal', filterButton: false, totalsRowFunction: 'sum' },
                    ];
                    if (this.type == InvoiceModules.STORE) {
                        const indexScholarships = columns.findIndex((c) => c.name == 'Becas venta')
                        columns.splice(indexScholarships, 1);
                        const indexSurcharges = columns.findIndex((c) => c.name == 'Recargos venta')
                        columns.splice(indexSurcharges, 1);
                    }
                    break;
                case 'Ventas':
                    columns = [
                        { name: 'Fecha de creación', filterButton: false },
                        { name: 'Usuario', filterButton: true },
                        { name: 'Tipo', filterButton: true },
                        { name: 'Matricula', filterButton: true },
                        { name: 'Nombre', filterButton: false },
                        { name: 'Folio de venta', filterButton: false },
                        { name: 'Estatus venta/pago', filterButton: true },
                        { name: 'Concepto', filterButton: false},
                        { name: 'Cantidad', filterButton: false},
                        { name: 'Precio', filterButton: false},
                        { name: 'Importe', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Becas detalle', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Descuentos detalle', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Recargos detalle', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Subtotal detalle sin iva', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'detalle IVA', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Subtotal detalle', filterButton: false, totalsRowFunction: 'sum' },
                        { name: 'Total venta', filterButton: false, totalsRowFunction: 'sum' },
                    ];
                    if (this.type == InvoiceModules.STORE) {
                        const indexScholarships = columns.findIndex((c) => c.name == 'Becas detalle')
                        columns.splice(indexScholarships, 1);
                        const indexSurcharges = columns.findIndex((c) => c.name == 'Recargos detalle')
                        columns.splice(indexSurcharges, 1);
                    }
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
            this.rows.forEach((value: PaymentExtraCharge) => {
                const columns = [];
                columns.push(getRangeDates(this.params.startDate, this.params.endDate).title)
                columns.push(this.getTipoClient(value.a_type));
                columns.push(value.a_key);
                columns.push(value.a_fullname);
                columns.push(parseFloat(`${value.count}`));
                columns.push(parseFloat(`${value.p_income}`));
                rows.push(columns);
            });
        } else {
            this.rows.forEach((value: PaymentExtraCharge) => {
                const columns = [];
                switch (this.typeReport) {
                    case 'Pagos Facturados':
                        columns.push(value.p_created_at);
                        columns.push(value.f_status == '1' ? value.u_fullname_cashier : value.us_fullname_cancelation);
                        columns.push(value.v_folio);
                        columns.push(value.p_folio);
                        columns.push(this.getStatusVentaPago(value.p_status_Global));
                        columns.push(value.f_folio);
                        columns.push(this.getStatusFacturado(value).value);
                        columns.push(this.getTipoClient(value.a_type));
                        columns.push(value.a_key);
                        columns.push(value.a_fullname);
                        columns.push(this.type == InvoiceModules.ACADEMY ? value.v_observaciones : value.v_observations);
                        columns.push(value.f_metodo_pago);
                        columns.push(parseFloat(`${value.total_details_without_extra}`));
                        if (this.type != InvoiceModules.STORE) {
                            columns.push(parseFloat(`${value.charges.scholarships}`));
                        }
                        columns.push(parseFloat(`${value.charges.discounts}`));
                        if (this.type != InvoiceModules.STORE) {
                            columns.push(parseFloat(`${value.charges.surcharges}`));
                        }
                        columns.push(parseFloat(`${value.totals.totalWithoutIVA}`));
                        columns.push(parseFloat(`${value.totals.IVA}`));
                        columns.push(parseFloat(`${value.p_income}`));
                        columns.push(parseFloat(`${value.p_quantity}`));
                        columns.push(parseFloat(`${value.p_change}`));
                        columns.push(parseFloat(`${value.p_income}`));
                        break;
                    case 'Pagos':
                        columns.push(value.p_created_at);
                        columns.push(this.params.status == 2 ? value.p_fullname_cashier : value.p_fullname_cancelation);
                        columns.push(this.getStatusFacturado(value).name);
                        columns.push(this.getStatusFacturado(value).value);
                        columns.push(value.v_folio);
                        columns.push(value.p_folio);
                        columns.push(this.params.status == 2 ? this.getStatusVentaPago(value.p_status_Global) : 'N/A');
                        columns.push(this.getTipoClient(value.a_type));
                        columns.push(value.a_key);
                        columns.push(value.a_fullname);
                        columns.push(this.type == InvoiceModules.ACADEMY ? value.v_observaciones : value.v_observations);
                        columns.push(value.p_metodo_pago);
                        columns.push(parseFloat(`${value.total_details_without_extra}`));
                        if (this.type != InvoiceModules.STORE) {
                            columns.push(parseFloat(`${value.charges.scholarships}`));
                        }
                        columns.push(parseFloat(`${value.charges.discounts}`));
                        if (this.type != InvoiceModules.STORE) {
                            columns.push(parseFloat(`${value.charges.surcharges}`));
                        }
                        columns.push(parseFloat(`${value.totals.totalWithoutIVA}`));
                        columns.push(parseFloat(`${value.totals.IVA}`));
                        columns.push(parseFloat(`${value.p_income}`));
                        columns.push(parseFloat(`${value.p_quantity}`));
                        columns.push(parseFloat(`${value.p_change}`));
                        columns.push(parseFloat(`${value.p_income}`));
                        break;
                    case 'Ventas':
                        columns.push(value.v_created_at);
                        columns.push(value.u_fullname_cashier);
                        columns.push(this.getTipoClient(value.a_type));
                        columns.push(value.a_key);
                        columns.push(value.a_fullname);
                        columns.push(value.v_folio);
                        columns.push(this.getStatusVentaPagoSale(value.p_status_Global));
                        columns.push(value.concept.name);
                        columns.push(value.concept.quantity);
                        columns.push(value.concept.price);
                        columns.push(value.concept.import);
                        if (this.type != InvoiceModules.STORE) {
                            columns.push(parseFloat(`${value.charges.scholarships}`));
                        }
                        columns.push(parseFloat(`${value.charges.discounts}`));
                        if (this.type != InvoiceModules.STORE) {
                            columns.push(parseFloat(`${value.charges.surcharges}`));
                        }
                        columns.push(parseFloat(`${value.totals.totalWithoutIVA}`));
                        columns.push(parseFloat(`${value.totals.IVA}`));
                        columns.push(parseFloat(`${value.p_income}`));
                        columns.push(parseFloat(`${value.total_details_without_extra}`));
                        break;
                    default:
                        break;
                }

                rows.push(columns);
            });
        }
        return rows;
    }
}

