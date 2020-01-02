import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as xlsx from 'xlsx';
import { WorkBook } from 'xlsx';
import { MiniStoreProductsService } from '../mini-store/mini-store-products/mini-store-products.service';
import { MiniStorePriceList } from '../mini-store/mini-store-prices-lists/entities/mini-store-price-list.entity';
import { MiniStoreClassification } from '../mini-store/mini-store-classifications/entities/mini-store-classification.entity';
import { InvoiceKeys } from '../invoice/invoice-keys/entities/invoice-keys.entity';

/**
 * TODO: borrar, es solo para pruebas
 */
interface Product {
    unitMeasurement: number;
    productName: string;
    classification: string;
    barcode: string;
    stock: number;
    minStock: number;
    maxStock: number;
    price: string;
    providerPrice: string;
    priceList: number;
    serieFact: number;
}

@Controller('xls-importer')
export class XlsImporterController {

    constructor(readonly miniStoreProductsService: MiniStoreProductsService) {
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                cb(null, './xls-imports');
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '_' + file.originalname);
            },
        }),
    }))
    async uploadFile(@UploadedFile() file) {
        const uploadedFile = fs.readFileSync(file.path);
        const workBook = xlsx.read(uploadedFile);
        const products: any = this.xlsWorkbookToJSON<Product>(workBook, {
            defaultValue: null,
            range: 'A2:K265',
            headers: [
                'unitMeasurement',
                'productName',
                'classification',
                'barcode',
                'stock',
                'minStock',
                'maxStock',
                'price',
                'providerPrice',
                'priceList',
                'serieFact',
            ],
        });
        for (const product of products.Hoja1) {
            const classifications = {
                'PANES Y GALLETAS': 1,
                'BOTANAS': 2,
                'GOLOCINAS': 3,
                'LACTEOS': 4,
                'REFRESCOS, AGUAS Y JUGOS': 5,
                'ABARROTES': 6,
                'CARNES FRIAS': 7,
                'CARNES FRESCAS': 8,
            };
            const classification = classifications[product.classification];
            this.miniStoreProductsService.createProduct({
                name: product.productName,
                description: product.productName,
                code: 'NOCODE',
                codeBar: product.barcode ? product.barcode : 'NOCODE',
                isActive: true,
                price: '0.000000',
                priceWithIVA: '0.000000',
                priceProvider: '0.000000',
                IVA: true,
                stock: 500,
                minStock: 10,
                maxStock: 1200,
                unity: 'Pieza',
                unitMeasurement: product.unitMeasurement,
                idPriceList: 4,
                idClassification: classification,
                idInvoiceKey: 1,
                storePriceList: { id: 4 } as MiniStorePriceList,
                storeClassification: { id: classification } as MiniStoreClassification,
                miniStoreWarehouseOrdersProducts: [],
                storeInvoiceKey: { id: 1 } as InvoiceKeys,
                miniStoreSaleDetails: [],
            });
        }

    }

    xlsWorkbookToJSON<T = any>(workBook: WorkBook, options: {
        range: string,
        defaultValue: any,
        headers: string[],
    }): T[] {
        const JSONWorkBook = [];
        Object.keys(workBook.Sheets).forEach((sheet) => {
            JSONWorkBook[sheet] = xlsx.utils.sheet_to_json<T>(
                workBook.Sheets[sheet],
                {
                    blankrows: true,
                    header: options.headers,
                    range: options.range,
                    defval: options.defaultValue,
                });
        });
        return JSONWorkBook;
    }
}
