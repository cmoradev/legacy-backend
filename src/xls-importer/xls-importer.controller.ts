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
import {MiniStorePricesListsService} from "../mini-store/mini-store-prices-lists/mini-store-prices-lists.service";
import {MiniStoreClassificationsService} from "../mini-store/mini-store-classifications/mini-store-classifications.service";
import {InvoiceKeysService} from "../invoice/invoice-keys/invoice-keys.service";
import {BranchOfficeService} from "../system/branch-office/branch-office.service";
import {BranchOffice} from "../system/branch-office/entities/branch-office.entity";
import {number} from "@hapi/joi";
import {tableLayouts} from "pdfmake/build/pdfmake";
//import {productsMiniStoreService} from "../../../ci-control/src/services/miniStore/products.miniStore.service";


/**
 * TODO: borrar, es solo para pruebas
 */
interface Product {
    nombre: string,
    descripcion: string,
    codigo: string,
    codigo_barra: string,
    precio: number,
    precio_con_iva: number,
    precio_proveedor: number,
    iva: number,
    stock: number,
    minstock: number,
    maxstock: number,
    unidad: string,
    id_listaprecios: string,
    id_clasificacion: string,
    id_facturacion_codigos: string,
    unitMeasurement: string,
    storePriceListId: string,
    storeClassificationId: string,
    storeInvoiceKeyId: string,
    branchOfficeId: string,
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
            'Content-Type': 'application/vnd.ms-excel'
          });

          
          //res.sendFile(path.resolve('./src/xls-importer/xls/producto_layout.xlsx'));
        if(requestData.layout == 'Productos'){
            let productData = await this.miniStoreProductsService.getEntityMetaData();

            let workbook = xlsx.utils.book_new();
            workbook.SheetNames.push("Hoja1");

            workbook.Props

            let ws_data = [productData];

            let ws = xlsx.utils.aoa_to_sheet(ws_data);

            workbook.Sheets["Hoja1"] = ws;

            let wbout = xlsx.write(workbook, {bookType:'xlsx',  type: 'base64'});

            res.send( JSON.stringify( wbout ));
        }
    }

    @Post('source')
    public async setSource(@Res() res: Response, @Body() requestData: xlsType) {
        let relationship = await this.miniStoreProductsService.getEntityRelations();
        relationship = JSON.parse(JSON.stringify(relationship));


        let workbook = xlsx.utils.book_new();
        workbook.SheetNames.push("Hoja1");


        let rows = []
        for(let i=0; i < relationship.rowCount; i++) {
            let data = [];
            for (let relation in relationship.relationsData) {
                if(relationship.relationsData[relation][i] && relationship.relationsData[relation][i].name){
                    data.push(relationship.relationsData[relation][i].name)
                } else {
                    data.push('')
                }
                rows[i] = data;

            }
        }

        rows.unshift(relationship.relations);
        let ws = xlsx.utils.aoa_to_sheet( rows );
        workbook.Sheets["Hoja1"] = ws;

        let wbout = xlsx.write(workbook, {bookType:'xlsx',  type: 'base64'});

        res.send( JSON.stringify( wbout ));
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
    public async bulkProductXls(@UploadedFile() file, @Res() res: Response, @Body() requestData: xlsType){
        const uploadedFile = fs.readFileSync(file.path);
        const workBook = xlsx.read(uploadedFile);
        const unitMeasurements = [
            {id: 1, name: 'Kilogramos', unit: 'Kg(s)'},
            {id: 6, name: 'Pieza', unit: 'pza(s)'},
            {id: 8, name: 'Litros', unit: 'L'}
        ];

        let productDataHeaders = await this.miniStoreProductsService.getEntityMetaData();

        const products: any = this.xlsWorkbookToJSON<MiniStoreProduct>(workBook, {
            defaultValue: null,
            range: 'A2:W500',
            headers: productDataHeaders
        });

        const productToAdd = {} as MiniStoreProduct;

        for(const product of (products.Hoja1 as MiniStoreProduct[]) ){

            if(product.name === null){
              break;
            } else {
                for(let key in product){
                    productToAdd[key] = product[key];
                }
                try {
                    const measureId = unitMeasurements.find((unit) => {  return unit.name == product.unity  });
                    productToAdd.isActive = true;
                    productToAdd.isFavorite = false;
                    productToAdd.unitMeasurement =  measureId.id;
                    productToAdd.storePriceList = await this.miniStorePricesListsService.getListLike(String(product.storePriceList)) as MiniStorePriceList;
                    productToAdd.storeClassification = await this.miniStoreClassificationsService.getClasificationLike(String(product.storeClassification)) as MiniStoreClassification;
                    productToAdd.storeInvoiceKey = await this.invoiceKeysService.getInvoiceKeyLike( String(product.idInvoiceKey)) as InvoiceKeys;
                    productToAdd.BranchOffice =  await this.branchOfficeService.getBranchLike( String(product.BranchOffice)) as BranchOffice;
                    productToAdd.idPriceList = await this.miniStorePricesListsService.getListLike(String(product.storePriceList), true) as number;
                    productToAdd.idClassification = await this.miniStoreClassificationsService.getClasificationLike(String(product.storeClassification), true) as number;
                    productToAdd.idInvoiceKey = await this.invoiceKeysService.getInvoiceKeyLike( String(product.idInvoiceKey), true) as number;
                } catch (e) {
                    console.log("Error saving product... ", e);
                    return res.send({success: false, error: e});
                }

                try {
                    await this.miniStoreProductsService.createProduct(productToAdd);
                } catch (e) {
                    console.log("Error saving product... ", e);
                    return res.send({success: false, error: e});
                }

            }
        }
        try {
            fs.unlinkSync(`/tmp/${file.filename}`);
            console.log(`successfully deleted tmp/${file.filename}`);
        } catch (err) {
            console.log("Error on delete ", err);
            return res.send({success: false, error: err});
        }

        return res.send({success: true});
    }


}
