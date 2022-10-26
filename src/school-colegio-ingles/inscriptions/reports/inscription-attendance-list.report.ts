import { TableColumnProperties, Workbook, Worksheet,  } from 'exceljs';
import * as moment from 'moment';
import { ReportInscriptionsRow } from '../types/inscriptionsQuery';

const esMx = require('moment/locale/es-mx');

export class InscriptionAttendanceListReport {
    private rows: ReportInscriptionsRow[] = [];
    private workbook: Workbook;

    constructor( data: ReportInscriptionsRow[] = []) {
        this.rows = data;

        this.workbook = new Workbook();

        this.config();
        this.generate(
            this.addWorksheet(
                `generic_name`,
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
            properties: { tabColor: { argb: '359c5b' } },
        });
    }

    private generate(worksheet: Worksheet): Worksheet{
        let columns: TableColumnProperties[] = []
            columns = [
                { name: 'Matrícula', filterButton: true },
                { name: 'Nombre', filterButton: false },
                { name: 'Lu', filterButton: false },
                { name: 'Ma', filterButton: false },
                { name: 'Mi', filterButton: false },
                { name: 'Ju', filterButton: false },
                { name: 'Vi', filterButton: false },
            ];

        worksheet.mergeCells(`B2:K2`);
        const title = worksheet.getCell('B2');
        title.value = `Generic_name_report`
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
        description.value = `Report issued on ${moment().locale('es').format(
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

        this.rows.forEach((value: ReportInscriptionsRow) => {
            const columns = [];
            columns.push(value.studentRegistration)
            columns.push(value.studentName)
            rows.push(columns);
        });
        worksheet.addTable({
            displayName: 'Report',
            name: 'Report',
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