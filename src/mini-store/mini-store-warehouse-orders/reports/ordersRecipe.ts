import {
    AlignmentType,
    Document,
    Media,
    Packer,
    PageBorderDisplay,
    PageOrientation,
    Paragraph,
    RelativeHorizontalPosition,
    TextRun,
    UnderlineType,
    WidthType,
} from 'docx';
import * as path from 'path';
import * as toPdf from 'office-to-pdf';
import { TableDocx, TableHeaderDocx, TableRowsDocx } from '../../../common/office/docx/Table.docx';
import * as fs from 'fs';

export async function orderRecipe(options: {
    applicant: string,
    business: string,
    provider: string,
    orderDate: string,
    arrivalDate: string,
    requestedItems: string | number,
    folio: string,
    body: TableRowsDocx[][],
    total: string | number,
    subtotal: string | number,
    impuesto: string | number,
}): Promise<any> {
    const doc = new Document({
        creator: 'Punto de venta by amisael.amir.misael@gmail.com',
        description: 'documento generado en el sistema',
        title: 'ORDEN DE COMPRA',
    });
    const tablecustom = new TableDocx({ width: { size: 100, type: WidthType.PERCENTAGE } });
    const folio = new TableDocx({
        alignment: AlignmentType.RIGHT,
        width: { size: 0, type: WidthType.NIL },
        margins: {
            marginUnitType: WidthType.PERCENTAGE,
            bottom: 0,
        },
        float: {
            relativeHorizontalPosition: RelativeHorizontalPosition.RIGHT,
        },
    });
    const headers: TableHeaderDocx[] = [
        { text: 'N.', fontSize: 25, width: 5, align: AlignmentType.CENTER, background: '#EEEEEE' },
        { text: 'CONCEPTO/ DESCRIPCIÓN', width: 45, align: AlignmentType.CENTER, background: '#EEEEEE' },
        { text: 'C.PEDIDA', width: 12, background: '#EEEEEE' },
        { text: 'UNIDAD', width: 10, background: '#EEEEEE' },
        { text: 'C.RECIBIDA', width: 14, background: '#EEEEEE' },
        { text: 'PRECIO', width: 10, background: '#EEEEEE' },
        { text: 'VALOR', width: 10, background: '#EEEEEE' },
    ];

    const headersFolio: TableHeaderDocx[] = [
        { text: 'Folio', align: AlignmentType.CENTER, fontSize: 25, width: 20, background: '#EEEEEE' },
    ];
    const bodyFolio: TableRowsDocx[][] = [
        [
            { text: options.folio, align: AlignmentType.CENTER, textColor: '#ff0200', background: '#FFFFFF' },
        ],
    ];

    const bodyDetails: TableRowsDocx[][] = [
        [
            { text: '', columnSpan: 5 },
            { text: 'Subtotal', align: AlignmentType.CENTER },
            { text: options.subtotal },
        ],
        [
            { text: '', columnSpan: 5 },
            { text: 'Impuesto', align: AlignmentType.CENTER },
            { text: options.impuesto },
        ],
        [
            { text: '', columnSpan: 5 },
            { text: 'Total', align: AlignmentType.CENTER },
            { text: options.total },
        ],
    ];

    const image = Media.addImage(doc,
        fs.readFileSync(path.join(__dirname, '..', '..', '..', '..', 'public', 'images', 'line.png')),
        725, 10);

    folio.header(headersFolio);
    folio.body(bodyFolio);
    tablecustom.header(headers);
    tablecustom.body(options.body.concat(bodyDetails));
    doc.addSection({
        margins: {
            bottom: 0,
            left: 500,
            right: 500,
        },
        properties: {
            pageBorders: {
                display: PageBorderDisplay.FIRST_PAGE,
            },
        },
        size: {
            orientation: PageOrientation.PORTRAIT,
        },
        children: [
            folio.table(),
            new Paragraph({
                children: [
                    new TextRun({
                        size: 40,
                        text: 'ORDEN DE COMPRA',
                        font: {
                            name: 'Arial',
                        },
                        color: '#000000',
                    }),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: `Solicitante : ${options.applicant}`, font: {
                            name: 'Arial',
                        },
                    }),
                    new TextRun({
                        text: `\t\t\t\tArticulos solicitados : ${options.requestedItems}`, font: {
                            name: 'Arial',
                        },
                    }),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: `Proveedor : ${options.provider}`, font: {
                            name: 'Arial',
                        },
                    }),
                    new TextRun({
                        text: `\t\t\t\tFecha de pedido :  ${options.orderDate}`, font: {
                            name: 'Arial',
                        },
                    }),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: `Empresa : ${options.business}`, font: {
                            name: 'Arial',
                        },
                    }),
                    new TextRun({
                        text: `\tFecha de llegada : ${options.arrivalDate}`, font: {
                            name: 'Arial',
                        },
                    }),
                ],
            }),
            new Paragraph(''),
            tablecustom.table(),
            new Paragraph(''),
            new Paragraph(''),
            new Paragraph(''),
            new Paragraph({
                children: [image],
                spacing: {
                    after: 0,
                },
            }),
            new Paragraph({
                spacing: {
                    after: 0,
                },
                children: [
                    new TextRun({
                        text: 'AUTORIZADO POR (nombre y firma) ', font: {
                            name: 'Arial',
                        },
                    }),
                    new TextRun({
                        text: '\t\t\t\t\t\tSOLICITADO POR (nombre y firma)', font: {
                            name: 'Arial',
                        },
                    }),
                ],
            }),
        ],
    });

    const bufferWord = await Packer.toBuffer(doc);
    fs.writeFileSync('My Document.docx', bufferWord);
    const bufferPDf = await toPdf(bufferWord);
    fs.writeFileSync('My Document.pdf', bufferPDf);
    return bufferPDf;
}
