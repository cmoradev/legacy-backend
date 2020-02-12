import { Workbook } from 'exceljs';
import { MiniStoreProduct } from '../entities/mini-store-product.entity';

export class PriceProductsListReport {
    public generate(products: MiniStoreProduct[]): Workbook {
        const workbook = new Workbook();
        workbook.views = [
            {
                x: 0, y: 0, width: 10000, height: 20000,
                firstSheet: 0, activeTab: 0, visibility: 'visible',
            },
        ];
        const productsSheet = workbook.addWorksheet('Productos', {
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
            productItem.push(index + 1 || '');
            productItem.push(product.name || '');
            productItem.push(product.code || '');
            productItem.push(product.storeClassification.name || '');
            productItem.push(product.stock || 0);
            productItem.push(product.minStock || 0);
            productItem.push('');
            productsList.push(productItem);
        });

        productsSheet.addTable({
            name: 'products',
            displayName: 'products',
            headerRow: true,
            ref: 'A8',
            rows: productsList,
            columns: [
                { name: 'No' },
                { name: 'NOMBRE' },
                { name: 'CODIGO' },
                { name: 'CLASIFICACIÓN', filterButton: true },
                { name: 'ALMACEN' },
                { name: 'MINIMO' },
                { name: 'CHECK' },
            ],
        });

        productsSheet.getColumn('A').width = 5;
        productsSheet.getColumn('B').width = 40;
        productsSheet.getColumn('C').width = 15;
        productsSheet.getColumn('D').width = 30;
        productsSheet.getColumn('E').width = 20;
        productsSheet.getColumn('F').width = 20;
        productsSheet.getColumn('G').width = 15;
        return workbook;
    }
}
