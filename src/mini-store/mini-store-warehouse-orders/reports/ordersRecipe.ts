import { AlignmentType, Document, Packer, PageOrientation, Paragraph, TextRun } from 'docx';
import * as toPdf from 'office-to-pdf';
import { TableDocx, TableHeaderDocx, TableRowsDocx } from '../../../common/office/docx/Table.docx';

export async function orderRecipe(): Promise<any> {
    const doc = new Document({
        creator: 'AMIR MISAEL MARIN',
        description: 'My extremely interesting document',
        title: 'My Document',
    });
    const tablecustom = new TableDocx();
    const headers: TableHeaderDocx[] = [
        { text: 'No#', fontSize: 25, width: 5, background: '#9fff9a' },
        { text: 'CONCEPTO/ DESCRIPCIÓN', width: 45, align: AlignmentType.CENTER },
        { text: 'C.PEDIDA', width: 12 },
        { text: 'UNIDAD', width: 10 },
        { text: 'C.RECIBIDA', width: 14 },
        { text: 'PRECIO', width: 10 },
        { text: 'VALOR', width: 10 },
    ];

    const body: TableRowsDocx[][] = [
        [
            { text: '1', background: '#9fff9a' },
            { text: 'blusae', align: AlignmentType.CENTER },
            { text: '34' },
            { text: '21D' },
            { text: '34' },
            { text: '45654' },
            { text: '546' },
        ],
        [
            { text: '2' },
            { text: 'blusae', align: AlignmentType.CENTER },
            { text: '34' },
            { text: '2' },
            { text: '34', background: '#6A1B9A' },
            { text: '3455' },
            { text: '234' },
        ],
        [
            { text: '2', background: '#B71C1C' },
            { text: 'blusae', align: AlignmentType.CENTER },
            { text: '34' },
            { text: '2' },
            { text: '34', textColor: '#B71C1C' },
            { text: '5676' },
            { text: '456' },
        ],
    ];
    tablecustom.header(headers);
    tablecustom.body(body);
    // tablecustom.table();
    doc.addSection({
        margins: {
            top: 1,
            bottom: 1,
            left: 500,
            right: 500,
        },
        size: {
            orientation: PageOrientation.PORTRAIT,
        },
        children: [
            new Paragraph({
                children: [
                    new TextRun('Hello World'),
                    new TextRun({
                        text: 'Foo Bar',
                        bold: true,
                    }),
                    new TextRun({
                        text: '\tGithub is the best',
                        bold: true,
                    }),
                ],
            }),
            tablecustom.table(),
        ],
    });

    const bufferWord = await Packer.toBuffer(doc); /*.then((buffer) => {
        fs.writeFileSync('My Document.pdf', buffer);
    });*/
    // fs.writeFileSync('My Document.docx', bufferWord);
    const bufferPDf = await toPdf(bufferWord);
    return bufferPDf;
    // fs.writeFileSync('test.pdf', bufferPDf);
}
