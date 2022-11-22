import { TableColumnProperties, Workbook, Worksheet, } from 'exceljs';
import * as moment from 'moment';
import { QueryReportInscriptions, ReportInscriptionsRow } from '../types/inscriptionsQuery';
import { getNameList } from './helpers';

const esMx = require('moment/locale/es-mx');

export class InscriptionAttendanceListReport {
    
    private rows: {
        idGroup: number,
        nameGroup: string,
        idGrade: number,
        nameGrade: string,
        inscriptions: ReportInscriptionsRow[]
    }[];
    private workbook: Workbook;
    private params: QueryReportInscriptions;

    constructor(data: {
        idGroup: number,
        nameGroup: string,
        idGrade: number,
        nameGrade: string,
        inscriptions: ReportInscriptionsRow[]
    }[] = [], params: QueryReportInscriptions) {
        this.rows = data;
        this.params = params;

        this.workbook = new Workbook();

        this.config();

        data.forEach((itemGroup, index) => {
            this.generate(
                index,
                this.addWorksheet(
                    `${itemGroup.nameGrade} - ${itemGroup.nameGroup}`
                )
            );
        });
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
            properties: { tabColor: { argb: '359c5b' } },
        });
    }

    private generate(index: number, worksheet: Worksheet): Worksheet {
        let columns: TableColumnProperties[] = []
        columns = [
            { name: 'Matrícula', filterButton: false },
            { name: 'Nombre', filterButton: false },
        ];

        worksheet.mergeCells(`B2:K2`);
        const title = worksheet.getCell('B2');
        title.value = `${getNameList('Lista de asistencia', this.params, this.rows[index].inscriptions).title}`
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
        description.value = `Generado el ${moment().locale('es').format(
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

        this.rows[index].inscriptions.forEach((value: ReportInscriptionsRow) => {
            const columns = [];
            columns.push(value.studentRegistration)
            columns.push(value.studentName)
            rows.push(columns);
        });
        worksheet.addTable({
            displayName: `Report${index}`,
            name: `Report${index}`,
            ref: 'B5',
            headerRow: true,
            totalsRow: false,
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

            if (column.letter === 'C') {
                column.width = 45;
            }
        });

        return worksheet;
    }

    public getWorkBook(): Workbook {
        return this.workbook;
    }
}