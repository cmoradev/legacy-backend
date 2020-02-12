import { Workbook } from 'exceljs';
import { MiniStoreSaleDetail } from '../entities/mini-store-sale-detail.entity';
import { TopTrendingProduct } from '../interfaces/top-trending-product.interface';

export class TopTrendingProductsReport {
    public generate(products: TopTrendingProduct[]): Workbook {
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
        const topTrendingProducts = [];
        products.forEach(product => {
            const productItem = [];
            productItem.push(product.productName || '');
            productItem.push(product.classificationName || '');
            productItem.push(+product.quantity || '');
            topTrendingProducts.push(productItem);
        });

        productsSheet.addTable({
            name: 'topSales',
            displayName: 'topSales',
            headerRow: true,
            ref: 'B3',
            rows: topTrendingProducts,
            columns: [
                { name: 'Clasificación', filterButton: true },
                { name: 'Producto', filterButton: true },
                { name: 'Total vendidos' },
            ],
        });

        productsSheet.getColumn('B').width = 50;
        productsSheet.getColumn('C').width = 25;
        productsSheet.getColumn('D').width = 15;
        return workbook;
    }
}
