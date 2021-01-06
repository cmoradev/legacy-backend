import { Workbook } from 'exceljs';

export class QuoationsReport {
    public async generate(products: any[]): Promise<any> {
        const workbook = new Workbook();
        workbook.views = [
            {
                x: 0, y: 0, width: 10000, height: 20000,
                firstSheet: 0, activeTab: 0, visibility: 'visible',
            },
        ];
        const productsSheet = workbook.addWorksheet('cotizaciones', {
            properties:
              {
                  tabColor: {
                      argb: '359c5b',
                  },
              },
        });
        const productsList = [];
        products.forEach((product, index) => {
            const productItem = [];
            productItem.push(product.createdAt || '');
            productItem.push(product.cashier || '');
            productItem.push(product.folio || '');
            productItem.push(product.customer || 0);
            productItem.push(product.observation || 0);
            productItem.push(product.amount);
            productItem.push(product.saleFolio);
            productItem.push(product.finalizador);
            productItem.push(product.total);
            productItem.push(product.finishDate);
            productsList.push(productItem);
        });

        productsSheet.addTable({
            name: 'Cotizaciones',
            displayName: 'cotizaciones',
            headerRow: true,
            ref: 'A8',
            rows: productsList,
            columns: [
                { name: 'Fecha' },
                { name: 'Vendedor' },
                { name: 'Folio' },
                { name: 'Cliente' },
                { name: 'Observación' },
                { name: 'Monto' },
                { name: 'Folio de Venta' },
                { name: 'Finalizor' },
                { name: 'Total' },
                { name: 'Fecha Finalizado' },
            ],
        });

        productsSheet.getColumn('A').width = 5;
        productsSheet.getColumn('B').width = 40;
        productsSheet.getColumn('C').width = 15;
        productsSheet.getColumn('D').width = 30;
        productsSheet.getColumn('E').width = 20;
        productsSheet.getColumn('F').width = 20;
        productsSheet.getColumn('G').width = 15;
        const result = await workbook.xlsx.writeBuffer({
              filename: (+new Date()).toString() + '.xlsx',
          },
        );
        const buffer = Buffer.from(result);
        const b64Encoding = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
        return b64Encoding + buffer.toString('base64');
    }
}
