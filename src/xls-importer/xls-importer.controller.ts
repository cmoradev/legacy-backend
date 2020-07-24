import { Controller, Post, UploadedFile, UseInterceptors, Get, Res, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import * as xlsx from 'xlsx';
import { WorkBook } from 'xlsx';
import { MiniStoreProductsService } from '../mini-store/mini-store-products/mini-store-products.service';
import { MiniStorePriceList } from '../mini-store/mini-store-prices-lists/entities/mini-store-price-list.entity';
import { MiniStoreClassification } from '../mini-store/mini-store-classifications/entities/mini-store-classification.entity';
import { InvoiceKeys } from '../invoice/invoice-keys/entities/invoice-keys.entity';
import { MiniStoreProduct } from '../mini-store/mini-store-products/entities/mini-store-product.entity';
import { Response } from 'express';
import { xlsType } from './dto/xlsType.dto';
import { MiniStorePricesListsService } from '../mini-store/mini-store-prices-lists/mini-store-prices-lists.service';
import { MiniStoreClassificationsService } from '../mini-store/mini-store-classifications/mini-store-classifications.service';
import { InvoiceKeysService } from '../invoice/invoice-keys/invoice-keys.service';
import { BranchOfficeService } from '../system/branch-office/branch-office.service';
import { BranchOffice } from '../system/branch-office/entities/branch-office.entity';

// import {productsMiniStoreService} from "../../../ci-control/src/services/miniStore/products.miniStore.service";

/**
 * TODO: borrar, es solo para pruebas
 */
interface Product {
    nombre: string;
    descripcion: string;
    codigo: string;
    codigo_barra: string;
    precio: number;
    precio_con_iva: number;
    precio_proveedor: number;
    iva: number;
    stock: number;
    minstock: number;
    maxstock: number;
    unidad: string;
    id_listaprecios: string;
    id_clasificacion: string;
    id_facturacion_codigos: string;
    unitMeasurement: string;
    storePriceListId: string;
    storeClassificationId: string;
    storeInvoiceKeyId: string;
    branchOfficeId: string;
}

@Controller()
export class XlsImporterController {

    constructor(
        readonly miniStoreProductsService: MiniStoreProductsService,
        readonly miniStorePricesListsService: MiniStorePricesListsService,
        readonly miniStoreClassificationsService: MiniStoreClassificationsService,
        readonly invoiceKeysService: InvoiceKeysService,
        readonly branchOfficeService: BranchOfficeService,
    ) {
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
            /*const productToAdd = {
                //name: product.productName,
                //description: product.productName,
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
                //idClassification: product.classification,
                idInvoiceKey: 1,
                storePriceList: { id: product.priceList } as MiniStorePriceList,
                //storeClassification: { id: product.classification } as MiniStoreClassification,
                miniStoreWarehouseOrdersProducts: [],
                storeInvoiceKey: { id: product.serieFact } as InvoiceKeys,
            } as MiniStoreProduct;*/

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

    @Post('layout')
    public async setLayout(@Res() res: Response, @Body() requestData: xlsType) {
        console.log('Here...', requestData);
        res.set({
            'Content-Type': 'application/vnd.ms-excel',
        });


        // res.sendFile(path.resolve('./src/xls-importer/xls/producto_layout.xlsx'));
        if (requestData.layout === 'Productos') {
            const fileLoc = path.resolve('./src/xls-importer/xls/producto/producto_layout.xlsx');
            const stream = fs.createReadStream(fileLoc, { encoding: 'base64' });
            // res.send({ src: 'data:application/xlsx;filename=generated.xlsx;base64,' + stream });
            stream.pipe(res);
            // res.send(stream);
        }

    }

    @Post('source')
    public async setSource(@Res() res: Response, @Body() requestData: xlsType) {
        res.set({
            'Content-Type': 'application/vnd.ms-excel',
        });
        if (requestData.layout === 'Productos') {
            const fileLoc = path.resolve('./src/xls-importer/xls/producto/producto_source.xlsx');
            const stream = fs.createReadStream(fileLoc, { encoding: 'base64' });
            stream.pipe(res);
        }
    }

    @Post('bulk-product-xls')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                cb(null, '/tmp');
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '_' + file.originalname);
            },
        }),
    }))
    public async bulkProductXls(@UploadedFile() file, @Res() res: Response, @Body() requestData: xlsType) {
        const uploadedFile = fs.readFileSync(file.path);
        const workBook = xlsx.read(uploadedFile);

        const unitMeasurements = [
            { id: 1, name: 'Kilogramos', unit: 'Kg(s)' },
            { id: 6, name: 'Pieza', unit: 'pza(s)' },
            { id: 8, name: 'Litros', unit: 'L' },
        ];

        const products: any = this.xlsWorkbookToJSON<Product>(workBook, {
            defaultValue: null,
            range: 'A2:T500',
            headers: [
                'nombre', 'descripcion', 'codigo', 'codigo_barra', 'precio', 'precio_con_iva',
                'precio_proveedor', 'iva', 'stock', 'minstock', 'maxstock', 'unidad',
                'id_listaprecios', 'id_clasificacion', 'id_facturacion_codigos', 'unitMeasurement',
                'storePriceListId', 'storeClassificationId', 'storeInvoiceKeyId', 'branchOfficeId',
            ],
        });

        for (const product of (products.Hoja1 as Product[])) {
            if (product.nombre === null) {
                break;
            } else {
                const unitMeasureId: any = unitMeasurements.find((unit) => {
                    return unit.name == product.unidad;
                });
                const priceListId: any = await this.miniStorePricesListsService.getListLike(product.storePriceListId) as MiniStorePriceList;
                const classification: any = await this.miniStoreClassificationsService.getClasificationLike(product.storeClassificationId) as MiniStoreClassification;
                const invoiceKey: any = await this.invoiceKeysService.getInvoiceKeyLike(product.storeInvoiceKeyId) as InvoiceKeys;
                const branchOffice: any = await this.branchOfficeService.getBranchLike(product.branchOfficeId) as BranchOffice;

                const productToAdd = {
                    name: product.nombre,
                    description: product.descripcion,
                    code: product.codigo,
                    codeBar: product.codigo_barra ? product.codigo_barra : 'NOCODE',
                    isActive: true,
                    price: (+product.precio / (1.16)).toFixed(6),
                    priceWithIVA: (+product.precio_con_iva).toFixed(6),
                    priceProvider: (+product.precio_proveedor).toFixed(6),
                    IVA: true,
                    stock: product.stock,
                    minStock: product.minstock,
                    maxStock: product.maxstock,
                    unity: product.unidad,
                    unitMeasurement: unitMeasureId?.id as number,
                    idPriceList: priceListId.id as number,
                    idClassification: classification.id,
                    idInvoiceKey: invoiceKey.id,
                    isFavorite: false,
                    storePriceList: { id: priceListId.id } as MiniStorePriceList,
                    storeClassification: { id: classification.id } as MiniStoreClassification,
                    miniStoreWarehouseOrdersProducts: [],
                    storeInvoiceKey: { id: invoiceKey.id } as InvoiceKeys,
                    branchOffice: { id: branchOffice.id } as BranchOffice,
                } as MiniStoreProduct;

                try {
                    await this.miniStoreProductsService.createProduct(productToAdd);
                } catch (e) {
                    console.log('Error saving product... ', e);
                    return res.send({ success: false, error: e });
                }
            }
        }

        try {
            fs.unlinkSync(`/tmp/${file.filename}`);
            console.log(`successfully deleted tmp/${file.filename}`);
        } catch (err) {
            console.log('Error on delete ', err);
            return res.send({ success: false, error: err });
            // handle the error
        }

        return res.send({ success: true });


    }


}
