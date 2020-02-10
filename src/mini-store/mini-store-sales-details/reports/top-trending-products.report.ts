import { Workbook } from 'exceljs';
import { MiniStoreSaleDetail } from '../entities/mini-store-sale-detail.entity';

export class TopTrendingProductsReport {
    public generate(products: MiniStoreSaleDetail[]): Workbook {
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

        productsSheet.addTable({
            name: 'topTrendingProducts',
            displayName: 'Productos más vendidos',
            headerRow: true,
            style: { theme: 'TableStyleLight17' },
            ref: 'C3',
            rows: [[]],
            columns: [
                { name: 'Clasificación', filterButton: true },
                { name: 'Producto', filterButton: true },
                { name: 'Total vendidos' },
            ],
        });
        return workbook;
    }
}
