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
import { TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';
import { createPdf } from 'pdfmake/build/pdfmake';
import { vfs } from 'pdfmake/build/pdfmake';
import { pdfMake } from 'pdfmake/build/vfs_fonts';

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
    body: TableCell[][],
    total: string | number,
    subtotal: string | number,
    impuesto: string | number,
}): Promise<string> {

    options.body.unshift([
        {
            text: 'N°',
            fillColor: '#dddddd',
            border: [true, true, true, true],
        },
        {
            text: 'Concepto/Descricion',
            style: 'tableHeader',
            fillColor: '#dddddd',
            border: [true, true, true, true],
        },
        {
            text: 'C.pedida',
            style: 'tableHeader',
            fillColor: '#dddddd',
            border: [true, true, true, true],
        },
        {
            text: 'Unidad',
            style: 'tableHeader',
            fillColor: '#dddddd',
            border: [true, true, true, true],
        }, {
            text: 'C.Recibida',
            style: 'tableHeader',
            fillColor: '#dddddd',
            border: [true, true, true, true],
        },
        {
            text: 'Precio',
            style: 'tableHeader',
            fillColor: '#dddddd',
            border: [true, true, true, true],
        },
        {
            text: 'Valor',
            fillColor: '#dddddd',
            border: [true, true, true, true],
        },
    ]);

    options.body.push(
        [
            {
                text: 'Subtotal',
                colSpan: 6,
                style: {
                    alignment: 'right',
                },
            },
            { text: '' },
            { text: '' },
            { text: '' },
            { text: '' },
            { text: '' },
            { text: options.subtotal.toString() },
        ]);
    options.body.push([
        {
            text: 'Impuesto', colSpan: 6,
            style: {
                alignment: 'right',
            },
        },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: options.impuesto.toString() },
    ]);

    options.body.push([
        {
            text: 'Total', colSpan: 6,
            style: {
                alignment: 'right',
            },
        },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: options.total.toString() },
    ]);
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
                        width: 200,
                        table: {
                            headerRows: 1,
                            body: [

                                [
                                    {
                                        text: 'Folio',
                                        fillColor: '#dddddd',
                                        border: [true, true, true, true],
                                    },
                                ],
                                [
                                    options.folio,
                                ],
                            ],
                        },
                    },

                ],
            },

            {
                style: 'tableExample',
                margin: [0, 20, 0, 0],
                table: {
                    widths: [40, 153, 50, 80, 60, 50, 50],
                    headerRows: 1,
                    body: options.body,
                },
            },
            {
                margin: [0, 40, 0, 0],
                table: {
                    widths: [260, 260],
                    body: [
                        [
                            {
                                border: [false, false, false, true],
                                alignment: 'center',
                                text: '',
                            },
                            {
                                border: [false, false, false, true],
                                alignment: 'center',
                                text: '',
                            },
                        ],
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


    return new Promise(async (resolve, reject) => {
        const pdf1 = createPdf(docDefinition);
        pdf1.getBase64((result) => {
            resolve(result);
        });
    });
}
