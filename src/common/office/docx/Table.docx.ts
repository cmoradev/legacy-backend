import { AlignmentType, Paragraph, ShadingType, Table, TableCell, TableRow, TextRun, WidthType } from 'docx';

export interface TableHeaderDocx {
    text: string;
    fontSize?: number;
    textColor?: string;
    align?: AlignmentType;
    width: number;
    background?: string;
}

// tslint:disable-next-line:no-empty-interface
export interface TableRowsDocx extends Omit<TableHeaderDocx, 'width'> {

}

export class TableDocx {
    tableheader: TableRow;
    tablebody: TableRow[];
    columnWidths: number[] = [];

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
                                    text: header.text,
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
                        shading: {
                            color: item.background ? item.background : '#FFFFFF',
                            val: ShadingType.SOLID,
                        },
                        children: [
                            new Paragraph({
                                alignment: item.align,
                                children: [
                                    new TextRun({
                                        text: item.text,
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
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
            columnWidths: this.columnWidths,
            rows: this.tablebody,// body,
        });

        return table;
    }
}
