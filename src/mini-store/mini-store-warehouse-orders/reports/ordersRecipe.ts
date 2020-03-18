import {
    Document,
    Packer,
    PageOrientation,
    Paragraph,
    ShadingType,
    Table,
    TableCell,
    TableRow,
    TextRun,
    WidthType,
} from 'docx';
import * as toPdf from 'office-to-pdf';

export async function orderRecipe(): Promise<any> {
    const doc = new Document({
        creator: 'AMIR MISAEL MARIN',
        description: 'My extremely interesting document',
        title: 'My Document',
    });

    const table = new Table({
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        },
        rows: [
            new TableRow({
                tableHeader: true,
                children: [
                    new TableCell({
                        shading: {
                            color: '#396cff',
                            val: ShadingType.SOLID,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: 'id',
                                        size: 24,
                                        color: '#FFFFFF',
                                    }),
                                ],
                            })],
                    }),
                    new TableCell({
                        children: [new Paragraph('name')],
                    }),
                    new TableCell({
                        children: [new Paragraph('age')],
                    }),
                    new TableCell({
                        children: [new Paragraph('actions')],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph('hello')],
                    }),
                ],
            }),
        ],
    });

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
            table,
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
