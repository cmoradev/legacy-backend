import { createPdf, vfs } from 'pdfmake/build/pdfmake';
import { pdfMake } from 'pdfmake/build/vfs_fonts';
import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';
import { readFileSync } from 'fs';
import { rootPath } from '../../../common/utils';
// @ts-ignore
vfs = pdfMake.vfs;

export class TransactionsReport {

    async getDocument(options?: BufferOptions): Promise<string> {
        const bitmap = readFileSync(rootPath + '/public/images/logoOfficial.png');
        // convert binary data to base64 encoded string
        const logo = `data:image/png;base64, ${bitmap.toString('base64')}`;
        const docDefinition: Partial<TDocumentDefinitions> | any = {
            pageOrientation: 'landscape',
            content: [
                {
                    columns: [
                        {
                            stack: [
                                {
                                    width: 115,
                                    margin: [0, -25, 0, 0],
                                    image: logo,
                                    height: 100,
                                    alignment: 'left',
                                },
                                {
                                    text: 'Transacciónes',
                                    margin: [0, -15, 0, 0],
                                    style: {
                                        fontSize: 25,
                                        color: '#08A8D4',
                                    },
                                },
                            ],
                        },
                        {
                            width: 40,
                            text: '',
                        },
                        {
                            margin: [0, 0, 0, 0],
                            width: 200,
                            text: [
                                { text: 'RESÚMEN DE MOVIMIENTOS', alignment: 'center' },
                            ],
                        },
                        [
                            {
                                margin: [90, 0, 0, 10],
                                alignment: 'center',
                                width: [10],
                                table: {
                                    alignment: 'right',
                                    body: [
                                        [{
                                            text: 'FOLIO',
                                            style: {
                                                bold: true,
                                                fontSize: 9,
                                                alignment: 'center',
                                                margin: [0, 0, 0, 0],
                                            },
                                        }],
                                    ],

                                },
                                layout: {
                                    paddingLeft: (i: any, node: any) => {
                                        return 20;
                                    },
                                    paddingRight: (i: any, node: any) => {
                                        return 20;
                                    },
                                    paddingTop: (i: any, node: any) => {
                                        return 0;
                                    },
                                    paddingBottom: (i: any, node: any) => {
                                        return 0;
                                    },
                                    fillColor: (rowIndex: number, node: any, columnIndex: any) => {
                                        return (rowIndex === 0) ? '#eeeeee' : null;
                                    },
                                },
                            },
                            {
                                alignment: 'center',
                                margin: [90, 0, 0, 0],
                                table: {
                                    alignment: 'right',
                                    heights: 10,
                                    body: [
                                        [{
                                            text: 'FECHA',
                                            style: {
                                                bold: true,
                                                fontSize: 9,
                                                alignment: 'center',
                                                margin: [0, 0, 0, 0],
                                            },
                                        }],
                                    ],

                                },
                                layout: {
                                    paddingTop: (i: any, node: any) => {
                                        return 0;
                                    },
                                    paddingBottom: (i: any, node: any) => {
                                        return 0;
                                    },
                                    fillColor: (rowIndex: number, node: any, columnIndex: any) => {
                                        return (rowIndex === 0) ? '#eeeeee' : null;
                                    },
                                },
                            },
                        ],
                    ],
                },
                {
                    table: {
                        style: {
                            filledHeader: {
                                bold: true,
                                fontSize: 14,
                                color: 'white',
                                fillColor: 'black',
                                alignment: 'center',
                            },
                        },
                        body: [
                            [
                                {
                                    text: 'ACCION',
                                    style: {
                                        color: 'white',
                                        fillColor: '#187ABF',
                                    },
                                },
                                {
                                    text: 'TIPO',
                                    style: {
                                        color: 'white',
                                        fillColor: '#187ABF',
                                    },
                                },
                                {
                                    text: 'OBSERVACIÓN',
                                    style: {
                                        color: 'white',
                                        fillColor: '#187ABF',
                                    },
                                },
                                {
                                    text: 'AGENTE',
                                    style: {
                                        color: 'white',
                                        fillColor: '#187ABF',
                                    },
                                },
                                {
                                    text: 'CANTIDAD',
                                    style: {
                                        color: 'white',
                                        fillColor: '#187ABF',
                                    },
                                },
                            ],
                            [
                                'fixed-width cells have exactly the specified width',
                                {
                                    text: 'nothing interesting here',
                                    italics: true,
                                    color: 'gray',
                                },
                                {
                                    text: 'nothing interesting here',
                                    italics: true,
                                    color: 'gray',
                                },
                                {
                                    text: 'nothing interesting here',
                                    italics: true,
                                    color: 'gray',
                                },
                                {
                                    text: 'nothing interesting here', italics: true, color: 'gray',
                                },
                            ],
                        ],
                    },
                },
                {
                    margin: [0, 7, 0, 7],
                    table: {
                        widths: ['80%', '20%'],
                        body: [
                            [
                                {
                                    stack: [],
                                },
                                {
                                    text: [
                                        {
                                            text: 'INGRESOS: ',
                                            style: {
                                                bold: true,
                                                color: '#a76d09',
                                            },
                                        },
                                        { text: '\n' },
                                        {
                                            text: 'EGRESOS: ',
                                            style: {
                                                bold: true,
                                                color: '#a76d09',
                                            },
                                        },
                                        { text: '$\n' },
                                        {
                                            text: 'INGRESOS - EGRESOS: ',
                                            style: {
                                                bold: true,
                                                color: '#a76d09',
                                            },
                                        },
                                        { text: '$\n' },
                                        {
                                            text: 'CAJA CHIC: ',
                                            style: {
                                                bold: true,
                                                color: '#a76d09',
                                            },
                                        },
                                        { text: '$\n' },
                                        {
                                            text: 'SALDO FINAL',
                                            style: {
                                                bold: true,
                                                color: '#a76d09',
                                            },
                                        },
                                        { text: '$' },
                                    ],
                                    style: {
                                        fontSize: 9,
                                    },
                                },
                            ],
                        ],
                    },
                },
            ],
            footer: (currentPage: number, pageCount: number) => {
                return {
                    table: {
                        body: [
                            [

                                // {
                                //     image: logo,
                                //     margin: [10, 0, 0, 0],
                                //     alignment: 'center',
                                //     fit: [20, 20],
                                // },
                                {
                                    margin: [5, 5, 0, 0],
                                    text: 'by Muunyal',
                                    // stext: "Page " + currentPage.toString() + ' of ' + pageCount,
                                    alignment: 'right',
                                    style: {
                                        fontSize: 10,
                                    },
                                },
                            ],
                        ],
                    },
                    layout: 'noBorders',
                };
            },
        };
        const doc = createPdf(docDefinition);
        return new Promise(async (resolve, reject) => {

            doc!.getBase64((result) => {
                resolve(result);
            }, options);
        });
    }
}
