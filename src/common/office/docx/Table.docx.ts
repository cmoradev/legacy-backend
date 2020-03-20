import { AlignmentType, Paragraph, ShadingType, Table, TableCell, TableRow, TextRun, WidthType } from 'docx';
import { ITableOptions } from 'docx/build/file/table/table';

export interface TableHeaderDocx {
    text: string | number;
    fontSize?: number;
    textColor?: string;
    align?: AlignmentType;
    width: number;
    background?: string;
}

// tslint:disable-next-line:no-empty-interface
export interface TableRowsDocx extends Omit<TableHeaderDocx, 'width'> {
    readonly columnSpan?: number;
    readonly rowSpan?: number;
}

export class TableDocx {
    tableheader: TableRow;
    tablebody: TableRow[];
    columnWidths: number[] = [];
    options: Omit<ITableOptions, 'rows'> = {};

    constructor(option?: Omit<ITableOptions, 'rows'>) {
        if (option) {
            this.options = option;
        }
    }

    header(headers: TableHeaderDocx[]) {
        this.tableheader = new TableRow({
            tableHeader: true,
            children: headers.map((header) => {
                this.columnWidths.push(header.width ? header.width * 100 : 100);
                return new TableCell({
                    shading: {
                        color: header.background ? header.background : '#FFFFFF',
                        val: ShadingType.SOLID,
                    },
                    children: [
                        new Paragraph({
                            alignment: header.align,
                            children: [
                                new TextRun({
                                    font: {
                                        name: 'Arial',
                                    },
                                    text: header.text.toString(),
                                    size: header.fontSize ? header.fontSize : 24,
                                    color: header.textColor ? header.textColor : '#000000',
                                }),
                            ],
                        })],
                    margins: {
                        left: 0,
                        right: 0,
                    },
                });
            }),
        });
    }

    body(rows: TableRowsDocx[][]) {

        this.tablebody = rows.map((row) => {
            return new TableRow({
                tableHeader: false,
                children: row.map((item) => {
                    return new TableCell({
                        columnSpan: item.columnSpan,
                        rowSpan: item.rowSpan,
                        shading: {
                            color: item.background ? item.background : '#FFFFFF',
                            val: ShadingType.SOLID,
                        },
                        children: [
                            new Paragraph({
                                alignment: item.align,
                                children: [
                                    new TextRun({
                                        font: {
                                            name: 'Arial',
                                        },
                                        text: item.text.toString(),
                                        size: item.fontSize ? item.fontSize : 24,
                                        color: item.textColor ? item.textColor : '#000000',
                                    }),
                                ],
                            })],
                        margins: {
                            left: 0,
                            right: 0,
                        },
                    });
                }),
            });
        });
    }

    table() {
        this.tablebody.unshift(this.tableheader);
        const table = new Table({
            ...this.options,
            columnWidths: this.columnWidths,
            rows: this.tablebody, // body,
        });

        return table;
    }
}
