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
import { MiniStoreProduct } from '../mini-store/mini-store-products/entities/mini-store-product.entity';

/**
 * TODO: borrar, es solo para pruebas
 */
interface Product {
    productName: string;
    classification: number;
    unitMeasurement: string;
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
            range: 'B7:L336',
            headers: [
                'productName',
                'classification',
                'unitMeasurement',
                'barcode',
                'stock',
                'minStock',
                'maxStock',
                'price',
                'providerPrice',
                'serieFact',
                'priceList',
            ],
        });
        for (const product of (products.Hoja1 as Product[])) {
            // const classifications = {
            //     'PANES Y GALLETAS': 1,
            //     'BOTANAS': 2,
            //     'GOLOCINAS': 3,
            //     'LACTEOS': 4,
            //     'REFRESCOS, AGUAS Y JUGOS': 5,
            //     'ABARROTES': 6,
            //     'CARNES FRIAS': 7,
            //     'CARNES FRESCAS': 8,
            // };
            // const classification = classifications[product.classification];
            const productToAdd = {
                name: product.productName,
                description: product.productName,
                code: 'NOCODE',
                codeBar: product.barcode ? product.barcode : 'NOCODE',
                isActive: true,
                price: (+product.price / (1.16)).toFixed(6),
                priceWithIVA: (+product.price).toFixed(6),
                priceProvider: (+product.price).toFixed(6),
                IVA: true,
                stock: product.stock,
                minStock: product.minStock,
                maxStock: product.maxStock,
                unity: 'Pieza',
                unitMeasurement: 1,
                idPriceList: 4,
                idClassification: product.classification,
                idInvoiceKey: 1,
                storePriceList: { id: product.priceList } as MiniStorePriceList,
                storeClassification: { id: product.classification } as MiniStoreClassification,
                miniStoreWarehouseOrdersProducts: [],
                storeInvoiceKey: { id: product.serieFact } as InvoiceKeys,
            } as MiniStoreProduct;

            // descomentar en caso de querer cargar productos al sistema a través de excel
            // this.miniStoreProductsService.createProduct(productToAdd);
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
