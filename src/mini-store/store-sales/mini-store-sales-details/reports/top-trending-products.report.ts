import { Workbook } from 'exceljs';
import { MiniStoreSaleDetail } from '../entities/mini-store-sale-detail.entity';
import { TopTrendingProduct } from '../interfaces/top-trending-product.interface';
import { MultNumber } from '../../../../common/numbers';

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
            productItem.push(product.unity || '');
            productItem.push(+product.quantity || '');
            productItem.push(product.IVA===1? MultNumber(product.quantity,product.priceWithIVA) : MultNumber(product.quantity,product.price || ''));
            topTrendingProducts.push(productItem);
        });

        productsSheet.addTable({
            name: 'topSales',
            displayName: 'topSales',
            headerRow: true,
            ref: 'B3',
            rows: topTrendingProducts,
            columns: [
                { name: 'Producto', filterButton: true },
                { name: 'Clasificación', filterButton: true },
                { name: 'Unidad', filterButton: true },
                { name: 'Vendidos' },
                { name: 'Total' },
            ],
        });

        productsSheet.getColumn('B').width = 50;
        productsSheet.getColumn('C').width = 25;
        productsSheet.getColumn('D').width = 15;
        return workbook;
    }
}
