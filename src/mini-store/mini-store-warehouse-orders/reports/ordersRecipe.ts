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
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { createPdf } from 'pdfmake/build/pdfmake';
import {vfs} from 'pdfmake/build/pdfmake';
import {pdfMake} from 'pdfmake/build/vfs_fonts';

// @ts-ignore
vfs = pdfMake.vfs;

export async function orderRecipe(options: {
    applicant: string,
    business: string,
    provider: string,
    orderDate: string | any,
    arrivalDate: string | any,
    requestedItems: string | number,
    folio: string,
    body: TableRowsDocx[][],
    total: string | number,
    subtotal: string | number,
    impuesto: string | number,
}): Promise<string> {

    const docDefinition: TDocumentDefinitions = {
        pageSize: 'A4',
        pageMargins: [20, 25, 20, 25],
        // @ts-ignore
        content: [

            {
                text: [
                    {
                        fontSize: 13,
                        text: '\nORDEN DE COMPRA ',

                    },

                ],
            },

            {

                columns: [

                    {
                        width: 200,
                        text: [


                            {
                                text: [
                                    {
                                        text: '\n\nSolicitante:',
                                        style: {
                                            bold: true,
                                            fontSize: 10,
                                        },
                                    },
                                    { text: options.applicant + ' \n', fontSize: 10 },
                                ],
                            },
                            {
                                text: [
                                    {
                                        text: 'Proveedor:',
                                        style: {
                                            bold: true,
                                            fontSize: 10,
                                        },
                                    },
                                    { text: options.provider + '\n', fontSize: 10 },
                                ],
                            },
                            {
                                text: [
                                    {
                                        text: 'Empresa:',
                                        style: {
                                            bold: true,
                                            fontSize: 10,
                                        },
                                    },
                                    { text: options.business + '\n', fontSize: 10 },
                                ],
                            },


                        ],
                    },
                    {
                        width: 250,
                        text: [

                            {
                                text: [],
                            },
                            {
                                text: [
                                    {
                                        text: '\n\nArticulos Solicitados:',
                                        style: {
                                            bold: true,
                                            fontSize: 10,
                                        },
                                    },
                                    { text: options.requestedItems + '\n', fontSize: 10 },
                                ],
                            },
                            {
                                text: [
                                    {
                                        text: 'Fecha de Pedido:',
                                        style: {
                                            bold: true,
                                            fontSize: 10,
                                        },
                                    },
                                    { text: options.orderDate + '\n', fontSize: 10 },
                                ],
                            },
                            {
                                text: [
                                    {
                                        text: 'Fecha de Llegada:',
                                        style: {
                                            bold: true,
                                            fontSize: 10,
                                        },
                                    },
                                    { text: options.arrivalDate + '\n', fontSize: 10 },
                                ],
                            },


                        ],
                    },
                    {
                        width: 150,
                        style: 'tableExample',
                        table: {

                            headerRows: 1,
                            body: [

                                [{ text: 'Folio', fillColor: '#dddddd', border: [true, true, true, true] }],
                                [options.folio],
                            ],
                        },
                    },

                ],
            },

            {
                style: 'tableExample',
                table: {
                    widths: [40, 153, 50, 80, 60, 50, 50],
                    headerRows: 1,
                    body: [

                        [{
                            text: 'N°',
                            fillColor: '#dddddd',
                            border: [true, true, true, true],
                        }, {
                            text: 'Concepto/Descricion',
                            style: 'tableHeader',
                            fillColor: '#dddddd',
                            border: [true, true, true, true],
                        }, {
                            text: 'C.pedida',
                            style: 'tableHeader',
                            fillColor: '#dddddd',
                            border: [true, true, true, true],
                        }, {
                            text: 'Unidad',
                            style: 'tableHeader',
                            fillColor: '#dddddd',
                            border: [true, true, true, true],
                        }, {
                            text: 'C.Recibida',
                            style: 'tableHeader',
                            fillColor: '#dddddd',
                            border: [true, true, true, true],
                        }, {
                            text: 'Precio',
                            style: 'tableHeader',
                            fillColor: '#dddddd',
                            border: [true, true, true, true],
                        }, { text: 'Valor', fillColor: '#dddddd', border: [true, true, true, true] }],
                        ['1', 'cat', 'nomina', 'servicio', '19891', '090', '090'],
                    ],
                },


            },
            {

                style: 'tableExample',
                table: {

                    widths: [548],

                    body: [
                        [
                            {
                                border: [false, false, false, true],
                                alignment: 'center',
                                text: [
                                    {
                                        border: [false, false, true, false],
                                        linecolors: '#000080',
                                        style: { fontSize: 10, bold: true, color: '#a76d09' },
                                        text: ' ',
                                    },
                                    {
                                        border: [false, false, false, false],
                                        fontSize: 10,
                                        text: '\n  ',
                                    },
                                    {
                                        border: [false, false, false, false],
                                        linecolors: '#000080',
                                        style: { fontSize: 10, bold: true, color: '#a76d09' },
                                        text: '',
                                    },
                                    {
                                        border: [false, false, false, false],
                                        fontSize: 10,
                                        text: '\n\n\n\n  ',
                                    },
                                ],
                            },
                        ],
                    ],
                },
            },

            {


                style: 'tableExample',
                table: {

                    widths: [290, 250],
                    body: [
                        [
                            {
                                border: [false, false, false, false],
                                text: [

                                    {
                                        alignment: 'left',
                                        text: 'AUTORIZADO POR (Nombre y Firma) ',
                                        style: {
                                            bold: true,

                                        },
                                    },


                                ],
                            },
                            {
                                border: [false, false, false, false],
                                text: [


                                    {
                                        alignment: 'right',
                                        text: 'SOLICITADO POR (Nombre y Firma) ',
                                        style: {
                                            bold: true,

                                        },
                                    },


                                ],
                            },
                        ],
                    ],
                },
            },


        ],
    };


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


    return new Promise(async (resolve, reject) => {
        const pdf1 = createPdf(docDefinition);
        pdf1.getBase64((result) => {
            resolve(result);
        });
    });
}
