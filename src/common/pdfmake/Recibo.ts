import { Size, TDocumentDefinitions } from 'pdfmake/interfaces';
import { createPdf, TCreatedPdf } from 'pdfmake/build/pdfmake';
import { vfs } from 'pdfmake/build/pdfmake';
import { pdfMake } from 'pdfmake/build/vfs_fonts';
import { NumeroALetras } from '../numbers-to-letter';
import { InvoiceModules } from '../point-of-sale/types.pos';

// @ts-ignore
vfs = pdfMake.vfs;

export class Recibo {

    public type: InvoiceModules = InvoiceModules.STORE;

    public setType(type: InvoiceModules): void {
        this.type = type;
    }

    private docDefinition: TDocumentDefinitions | any = {
        pageSize: 'A4',
        pageMargins: [20, 25, 20, 25],
        content: [       
            {
                columns: [
                    {
                        
                        text: 'logo',
                        width: 100,
                        height: 100
                    
                    },
                    {
                        width: 40,
                        text: ''
                    },
                    {
                        margin: [0, 0, 0, 0],
                        width: 200,
                        text: [
                            {
                                text: '\n',
                                style: {
                                    bold: true,
                                    color: '#a76d09',
                                }
                            },
                            {
                                text: [
                                    {
                                        text: 'R.F.C: ',
                                        style: {
                                            bold: true,
                                            color: '#a76d09',
                                        }
                                    },
                                    { text: '\n' }
                                ]
                            },
                            {
                                text: [
                                    {
                                        text: 'REGIMEN: ',
                                        style: {
                                            bold: true,
                                            color: '#a76d09',
                                        }
                                    },
                                    { text: '\n' }
                                ]
                            },
                            {
                                text: [
                                    {
                                        text: 'LUGAR DE EXPEDICION: ',
                                        style: {
                                            bold: true,
                                            color: '#a76d09',
                                        }
                                    },
                                    { text: '\n' }
                                ]
                            }
                        ],
                        style: {
                            fontSize: 9,
                        }
                    },
                    [
                        {
                            alignment: 'center',
                            margin: [55, 0, 0, 0],
                            text: '',
                            style: {
                                fontSize: 9,
                                bold: true,
                            }
                        },
                        {
                            margin: [80, 0, 0, 10],
                            alignment: 'center',
                            width: [10],
                            table: {
                                widths: [83],
                                alignment: 'right',
                                body: [
                                    [{
                                        text: 'FOLIO',
                                        style: {
                                            bold: true,
                                            fontSize: 9,
                                            alignment: 'center',
                                            margin: [0, 0, 0, 0],
                                        }
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
                                }
                            }
                        },
                        {
                            alignment: 'center',
                            margin: [80, 0, 0, 10],
                            table: {
                                alignment: 'right',
                                heights: 10,
                                widths: [115],
                                body: [
                                    [{
                                        text: 'FECHA',
                                        style: {
                                            bold: true,
                                            fontSize: 9,
                                            alignment: 'center',
                                            margin: [0, 0, 0, 0],
                                        }
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
                                }
                            }
                        }
                    ]
                ]
            },
            {
                columns: [
                    {
                        bold: true,
                        margin: [0, 20, 0, 10],
                        text: [
                            {
                                text: 'DATOS DEL CLIENTE\n',
                                style: {
                                    color: '#0941a7'
                                }
                            },
                            {
                                text: 'MATRICULA: ',
                                style: {
                                    bold: true,
                                    color: '#a76d09',
                                }
                            },
                            { text: '' },
                            {
                                text: 'NOMBRE: ',
                                style: {
                                    bold: true,
                                    color: '#a76d09',
                                }
                            },
                            { text: '' },
                            {
                                text: ' ',
                                style: {
                                    bold: true,
                                    color: '#a76d09',
                                }
                            },
                            { text: '' }
                        ],
                        style: {
                            fontSize: 10,
                        }
                    },
                    {
                        width: 200,
                        text: ''
                    },
                    {
                        bold: true,
                        margin: [0, 20, 0, 10],
                        text: [
                            {
                                text: 'INFORMACION\n',
                                style: {
                                    color: '#0941a7'
                                }
                            },
                            {
                                text: 'VENDEDOR:\n',
                                style: {
                                    color: '#a76d09',
                                }
                            },
                            { text: '' },
                            {
                                text: 'COMPROBANTE: ',
                                style: {
                                    bold: true,
                                    color: '#a76d09',
                                }
                            },
                            {
                                text: 'I',
                                style: {
                                    bold: true,
                                    color: '#020200',
                                }
                            }
                        ],
                        style: {
                            fontSize: 10,
                        }
                    },
                ]
            },
            {
                style: {
                    fontSize: 9
                },
                table: {
                    widths: [],
                    body: [],
                },
                layout: {
                    fillColor: (rowIndex: number, node: any, columnIndex: any) => {
                        return (rowIndex === 0) ? '#eeeeee' : null;
                    }
                }
            },
            {
                margin: [0, 7, 0, 7],
                table: {
                    widths: ['*', 'auto'],
                    body: [
                        [
                            {
                                stack: [
                                    {
                                        text: 'CANTIDAD CON LETRA',
                                        style: {
                                            bold: true,
                                            fontSize: 9
                                        }
                                    },
                                    {
                                        text: '',
                                        style: {
                                            fontSize: 9
                                        }
                                    },
                                    {
                                        text: 'OBSERVACIONES',
                                        style: {
                                            bold: true,
                                            fontSize: 9
                                        }
                                    },
                                    {
                                        text: '',
                                        style: {
                                            fontSize: 9
                                        }
                                    }
                                ]
                            },
                            {
                                text: [
                                    {
                                        text: 'SUBTOTAL: ',
                                        style: {
                                            bold: true,
                                            color: '#a76d09',
                                        }
                                    },
                                    { text: '\n' },
                                    {
                                        text: 'RECARGO: ',
                                        style: {
                                            bold: true,
                                            color: '#a76d09',
                                        }
                                    },
                                    { text: '$\n' },
                                    {
                                        text: 'DESCUENTO: ',
                                        style: {
                                            bold: true,
                                            color: '#a76d09',
                                        }
                                    },
                                    { text: '$\n' },
                                    {
                                        text: 'IMPUESTOS: ',
                                        style: {
                                            bold: true,
                                            color: '#a76d09',
                                        }
                                    },
                                    { text: '$\n' },
                                    {
                                        text: 'TOTAL: ',
                                        style: {
                                            bold: true,
                                            color: '#a76d09',
                                        }
                                    },
                                    { text: '$' }
                                ],
                                style: {
                                    fontSize: 9
                                }
                            }
                        ],
                    ]
                }
            },
            {
                style: {
                    fontSize: 9
                },
                table: {
                    widths: [190, 55, 160, 50, 55],
                    body: [
                        [
                            {
                                text: 'FORMA DE PAGO',
                                style: {
                                    bold: true
                                }
                            },
                            {
                                text: 'CANTIDAD',
                                style: {
                                    bold: true
                                }
                            },
                            {
                                text: 'BANCO',
                                alignment: 'center',
                                style: {
                                    bold: true
                                }
                            },
                            {
                                text: 'CUENTA',
                                style: {
                                    bold: true
                                }
                            },
                            {
                                text: 'FECHA',
                                style: {
                                    bold: true
                                }
                            },
                        ],
                    ],
                },
                layout: {
                    fillColor: (rowIndex: number, node: any, columnIndex: any) => {
                        return (rowIndex === 0) ? '#eeeeee' : null;
                    }
                }
            },
            {
            },
        ]
    }

    public async getDocument(): Promise<TCreatedPdf> {

        return createPdf(this.docDefinition);
    }

    public addLabel() {
        this.docDefinition.content[0].columns[3][0] = {
            alignment: 'center',
            margin: [55, 0, 0, 0],
            text: 'RECIBO DE PAGO',
            style: { fontSize: 9, bold: true }
        }
        this.docDefinition.content[5] = {
            columns: [
                {
                    bold: true,
                    margin: [0, 20, 0, 10],
                    text: [
                        {
                            text: 'ESTE COMPROBRANTE NO ES VALIDO PARA EFECTOS FISCALES\n',
                        },
                    ],
                    style: {
                        fontSize: 10,
                    }
                },
                {
                    width: 200,
                    text: ''
                },
            ]
        }
    }

    public addLabelQuote() {
        this.docDefinition.content[0].columns[3][0] = {
            alignment: 'center',
            margin: [55, 0, 0, 0],
            text: 'COTIZACIÓN',
            style: { fontSize: 9, bold: true }
        }
    }


    public addLogo(logo: any): boolean {
        if (logo) {
            if (typeof logo === 'object') {
                this.docDefinition.content[0].columns[0] = {
                    width: logo.width,
                    image: logo.image,
                    height: logo.height,
                    alignment: 'left'
                }
            } else {
                this.docDefinition.content[0].columns[0] = {
                    width: 100,
                    image: logo,
                    height: 100,
                    alignment: 'left'
                }
            }
        } else {
            this.docDefinition.content[0].columns[0] = {
                width: 100,
                image: logo,
                height: 100,
                alignment: 'left'
            }
        }
        if (typeof this.docDefinition.content[0].columns[0].image == 'string') {
            return true
        } else {
            return false;
        }
    }

    public addFolio(folio: string): boolean {
        const lengthbody = this.docDefinition.content[0].columns[3][1].table.body.length;
        const data = [{
            text: folio,
            style: {
                fontSize: 10,
                alignment: 'center',
                color: 'red',
                margin: [0, 0, 0, 0],
            }
        }]
        this.docDefinition.content[0].columns[3][1].table.body.push(data)
        if (this.docDefinition.content[0].columns[3][1].table.body.length > lengthbody) {
            return true
        } else {
            return false
        }
    }

    public addDate(date: string): boolean {
        const lengthbody = this.docDefinition.content[0].columns[3][2].table.body.length;
        const data = [{
            text: date,
            style: {
                fontSize: 10,
                alignment: 'center',
                color: 'red',
                margin: [0, 0, 0, 0],
            }
        }]
        this.docDefinition.content[0].columns[3][2].table.body.push(data);
        if (this.docDefinition.content[0].columns[3][2].table.body.length > lengthbody) {
            return true
        } else {
            return false
        }
    }

    public addEmisor(emisor: { name: string, rfc: string, regimen: string, expedido: string }): boolean {
        this.docDefinition.content[0].columns[2].text[0].text = emisor.name.toUpperCase() + '\n'
        this.docDefinition.content[0].columns[2].text[1].text[1].text = emisor.rfc + '\n'
        this.docDefinition.content[0].columns[2].text[2].text[1].text = emisor.regimen + '\n'
        this.docDefinition.content[0].columns[2].text[3].text[1].text = emisor.expedido + '\n';
        if (this.docDefinition.content[0].columns[2].text[0].text.length > 1
            && this.docDefinition.content[0].columns[2].text[1].text[1].text.length > 1
            && this.docDefinition.content[0].columns[2].text[2].text[1].text.length > 1
            && this.docDefinition.content[0].columns[2].text[3].text[1].text.length > 1) {
            return true
        } else {
            return false
        }
    }

    public addReceptor(receptor: { matricula: string, name: string, curp: string, type: InvoiceModules }): boolean {
        this.docDefinition.content[1].columns[0].text[2] = { text: receptor.matricula + '\n' }
        this.docDefinition.content[1].columns[0].text[4] = { text: receptor.name + '\n' }
        if (receptor.type == InvoiceModules.SCHOOL) {
            this.docDefinition.content[1].columns[0].text[5] = {
                text: 'CURP: ', style: {
                    bold: true,
                    color: '#a76d09',
                }
            }
        } else if (receptor.type == InvoiceModules.STORE || receptor.type == InvoiceModules.ACADEMY) {
            this.docDefinition.content[1].columns[0].text[5] = {
                text: 'RFC: ', style: {
                    bold: true,
                    color: '#a76d09',
                }
            }
        }
        this.docDefinition.content[1].columns[0].text[6] = { text: receptor.curp + '\n' }
        if (this.docDefinition.content[1].columns[0].text[2].text.length > 1
            && this.docDefinition.content[1].columns[0].text[4].text.length > 1
            && this.docDefinition.content[1].columns[0].text[5].text.length > 1
            && this.docDefinition.content[1].columns[0].text[6].text.length > 1) {
            return true
        } else {
            return false
        }
    }

    public addInformacion(info: { vendedor: string }) {
        this.docDefinition.content[1].columns[2].text[2] = { text: info.vendedor + '\n' }
        if (this.docDefinition.content[1].columns[2].text[2].text.length > 1) {
            return true
        } else {
            return false
        }
    }


    public addCatidad(comprobante: { SubTotal: string, Recargo: string, Descuento: string, Impuesto: string, Total: string }) {
        this.docDefinition.content[3].table.body[0][1].text[1] = { text: '$' + comprobante.SubTotal + '\n' }
        this.docDefinition.content[3].table.body[0][1].text[3] = { text: '$' + comprobante.Recargo + '\n' }
        this.docDefinition.content[3].table.body[0][1].text[5] = { text: '$' + comprobante.Descuento + '\n' }
        this.docDefinition.content[3].table.body[0][1].text[7] = { text: '$' + comprobante.Impuesto + '\n' }
        this.docDefinition.content[3].table.body[0][1].text[9] = { text: '$' + comprobante.Total + '\n' }
    }

    public addNumberToLetter(total: number) {
        // tslint:disable-next-line:no-unused-expression
        const nue = new NumeroALetras();
        this.docDefinition.content[3].table.body[0][0].stack[1].text = nue.NumeroALetras(total, {
            plural: 'PESOS',
            singular: 'PESO',
            centPlural: 'CENTAVOS',
            centSingular: 'CENTAVO'
        });

    }

    public addObervations(comment: string) {
        this.docDefinition.content[3].table.body[0][0].stack[3].text = comment
    }

    public addDetalles(detalles: any[]) {

        if (this.type == InvoiceModules.ACADEMY || this.type == InvoiceModules.SCHOOL) {
            this.docDefinition.content[2].table.widths.push(45);
            this.docDefinition.content[2].table.widths.push(50);
            this.docDefinition.content[2].table.widths.push(200);
            this.docDefinition.content[2].table.widths.push(50);
            this.docDefinition.content[2].table.widths.push(55);
            this.docDefinition.content[2].table.widths.push(50);
            this.docDefinition.content[2].table.widths.push(40);
            this.docDefinition.content[2].table.body.push(
                [
                    {
                        text: 'CANTIDAD',
                        style: {
                            bold: true
                        }
                    },
                    {
                        text: 'P.UNITARIO',
                        style: {
                            bold: true
                        }
                    },
                    {
                        text: 'CONCEPTO/DESCRIPCIÓN',
                        alignment: 'center',
                        style: {
                            bold: true
                        }
                    },
                    {
                        text: 'RECARGO',
                        style: {
                            bold: true
                        }
                    },
                    {
                        text: 'DESCUENTO',
                        style: {
                            bold: true
                        }
                    },
                    {
                        text: 'BECA',
                        style: {
                            bold: true
                        }
                    },
                    {
                        text: 'IMPORTE',
                        style: {
                            bold: true
                        }
                    }
                ]
            )
            for (const con of detalles) {
                this.docDefinition.content[2].table.body.push([
                    {
                        text: con.cantidad
                    },
                    {
                        text: '$' + con.preciou
                    },
                    {
                        text: con.descripcion
                    },
                    {
                        text: '$' + con.recargo
                    },
                    {
                        text: '$' + con.descuento
                    },
                    {
                        text: '$' + con.beca
                    },
                    {
                        text: '$' + con.importe
                    }
                ])
            }
        } else {
            this.docDefinition.content[2].table.widths.push(45);
            this.docDefinition.content[2].table.widths.push(50);
            this.docDefinition.content[2].table.widths.push(250);
            this.docDefinition.content[2].table.widths.push(50);
            this.docDefinition.content[2].table.widths.push(55);
            this.docDefinition.content[2].table.widths.push(40);
            this.docDefinition.content[2].table.body.push(
                [
                    {
                        text: 'CANTIDAD',
                        style: {
                            bold: true
                        }
                    },
                    {
                        text: 'P.UNITARIO',
                        style: {
                            bold: true
                        }
                    },
                    {
                        text: 'CONCEPTO/DESCRIPCIÓN',
                        alignment: 'center',
                        style: {
                            bold: true
                        }
                    },
                    {
                        text: 'RECARGO',
                        style: {
                            bold: true
                        }
                    },
                    {
                        text: 'DESCUENTO',
                        style: {
                            bold: true
                        }
                    },
                    {
                        text: 'IMPORTE',
                        style: {
                            bold: true
                        }
                    }
                ]
            )
            for (const con of detalles) {
                this.docDefinition.content[2].table.body.push([
                    {
                        text: con.cantidad
                    },
                    {
                        text: '$' + con.preciou
                    },
                    {
                        text: con.descripcion
                    },
                    {
                        text: '$' + con.recargo
                    },
                    {
                        text: '$' + con.descuento
                    },
                    {
                        text: '$' + con.importe
                    }
                ])
            }
        }
    }

    public addFormaPago(detalles: any[]) {
        for (const con of detalles) {
            this.docDefinition.content[4].table.body.push([
                {
                    text: con.forma
                },
                {
                    text: con.cantidad
                },
                {
                    text: con.banco
                },
                {
                    text: con.cuenta
                },
                {
                    text: con.fecha
                },
            ])
        }
    }
    public async getBlob<TCP, B>(options?: B): Promise<Blob> {
        return new Promise(async (resolve, reject) => {
            const doc = await this.getDocument();
            // @ts-ignore
            doc.getBlob((result) => {
                resolve(result)
            }, options)
        });
    }

    public async getBase64<B>(options?: B): Promise<string> {

        return new Promise(async (resolve, reject) => {
            const doc = await this.getDocument();
            // @ts-ignore
            doc!.getBase64((result) => {
                resolve(result)
            }, options)
        });
    }

    public async getBuffer<B>(options?: B): Promise<Buffer> {
        return new Promise(async (resolve, reject) => {
            const doc = await this.getDocument();
            // @ts-ignore
            doc!.getBuffer((result) => {
                resolve(result)
            }, options)
        });
    }

    public async getDataUrl<B>(options?: B): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const doc = await this.getDocument();
            // @ts-ignore
            doc!.getDataUrl((result) => {
                resolve(result)
            }, options)
        });
    }

    public async getStream<B>(options?: B) {
        const doc = await this.getDocument();
        // @ts-ignore
        return doc!.getStream(options)
    }

}