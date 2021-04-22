import { Workbook } from 'exceljs';

export interface ColumnsCatalog {
    tableName: string,
    cell: string,
    columns: { name: string }[],
    rows: any[]
}

export async function setCatalog(workbook: Workbook, columns: ColumnsCatalog[]) {
    columns.forEach((item, index) => {
        const sheetCatalog = workbook.addWorksheet(`Catelogo ${item.tableName}`, {
            views: [{
                state: 'normal',
            }],
            properties: {
                tabColor: {
                    argb: '08A8D4',
                },
            },
        });
        sheetCatalog.addTable({
            name: item.tableName,
            ref: 'A1',
            headerRow: true,
            totalsRow: false,
            style: {
                theme: 'TableStyleLight9',
                showRowStripes: false,
            },
            columns: item.columns,
            rows: item.rows,
        });
    });
    return workbook;
}
