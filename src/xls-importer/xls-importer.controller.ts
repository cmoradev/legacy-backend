import { Body, Controller, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as xlsx from 'xlsx';
import { WorkBook } from 'xlsx';
import { DataConverter } from '../common/office/excel-tools/data-converter';
import { InvoiceKeys } from '../invoice/invoice-keys/entities/invoice-keys.entity';
import { InvoiceKeysService } from '../invoice/invoice-keys/invoice-keys.service';
import { MiniStoreClassification } from '../mini-store/mini-store-classifications/entities/mini-store-classification.entity';
import { MiniStoreClassificationsService } from '../mini-store/mini-store-classifications/mini-store-classifications.service';
import { MiniStorePriceList } from '../mini-store/mini-store-prices-lists/entities/mini-store-price-list.entity';
import { MiniStorePricesListsService } from '../mini-store/mini-store-prices-lists/mini-store-prices-lists.service';
import { MiniStoreProduct } from '../mini-store/mini-store-products/entities/mini-store-product.entity';
import { MiniStoreProductsService } from '../mini-store/mini-store-products/mini-store-products.service';
import { StudentsService } from '../school-colegio-ingles/students/students.service';
import { BranchOfficeService } from '../system/branch-office/branch-office.service';
import { BranchOffice } from '../system/branch-office/entities/branch-office.entity';
import { xlsType } from './dto/xlsType.dto';
import { generateCatalog, generateTemplateStudents } from './template/alumnos';
import { templateProducts } from './template/productos';
import { convertToXlsx } from './utils/convertToXlsx';
import { Student } from '../school-colegio-ingles/students/entities/student.entity';
import { FamiliesService } from '../school-colegio-ingles/families/families.service';
import { Family } from '../school-colegio-ingles/families/entities/family.entity';
import { InscriptionsService, IRelationsInscriptions } from '../school-colegio-ingles/inscriptions/inscriptions.service';
import { generateTemplateInscriptions } from './template/inscripciones';
import { ColumnsCatalog, setCatalog } from './utils/setCatalog';
import { Inscription } from '../school-colegio-ingles/inscriptions/entities/inscription.entity';
import * as _ from 'lodash'
import { LevelsService } from '../school-colegio-ingles/levels/levels.service';
import { PaymentPlansService } from '../school-colegio-ingles/payment-plans/payment-plans.service';
import { PaymentPlanConceptsService } from '../school-colegio-ingles/payment-plan-concepts/payment-plan-concepts.service';

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
        readonly studentsService: StudentsService,
        readonly familyService: FamiliesService,
        readonly inscriptionService: InscriptionsService,
        readonly levelService: LevelsService,
        readonly paymentPlansService: PaymentPlansService,
        readonly paymentPlansConcepts: PaymentPlanConceptsService,
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
                    blankrows: false,
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
        const workbook = new ExcelJS.Workbook();
        res.set({
            'Content-Type': 'application/vnd.ms-excel',
        });

        let template = '';
        if (requestData.layout === 'Productos') {
            const productData = await this.miniStoreProductsService.getEntityMetaData();
            template = await templateProducts(workbook, productData);

        }
        res.send(template);
    }

    @Post('source')
    public async setSource(@Res() res: Response, @Body() requestData: xlsType) {
        let relationship = await this.miniStoreProductsService.getEntityRelations();
        relationship = JSON.parse(JSON.stringify(relationship));
        relationship.relations.push('unitMeasurement');
        const unitMeasurements = ['Kilogramos', 'Pieza', 'Litros'];
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Layout', {
            views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }],
            properties:
            {
                tabColor: {
                    argb: '359c5b',
                },
            },
        });

        const columns = [];

        for (const field of relationship.relations) {
            columns.push({ header: field, key: field });
        }

        sheet.columns = columns;
        sheet.columns.forEach(column => {
            if (column) {
                column.width = column.header.length < 12 ? 12 : column.header.length;
                column.style.protection = { locked: true };
            }
        });
        sheet.protect('password', {
            selectUnlockedCells: true,
            formatColumns: true,
            formatCells: true,
        });
        sheet.eachRow((row, rowNumber) => {
            if (rowNumber == 1) {
                row.eachCell((cell, cellNumber) => {
                    cell.style.alignment = { horizontal: 'center' };
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                    cell.style.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: '3F6CAF' },
                    };
                    cell.font = {
                        color: { argb: 'FFFFFF' },
                    };
                });
            }
        });


        const rows = [];
        for (let i = 0; i < relationship.rowCount; i++) {
            const data = [];
            for (const relation in relationship.relationsData) {
                if (relationship.relationsData[relation][i] && relationship.relationsData[relation][i].name) {
                    data.push(relationship.relationsData[relation][i].name);
                } else {
                    data.push('');
                }
                rows[i] = data;
            }
        }

        for (const unit in unitMeasurements) {
            const counter = parseInt(unit) + 1;
            rows[counter].push(unitMeasurements[unit]);
        }

        sheet.addRows(rows);

        const converter = new DataConverter();
        const wbout = await converter.convert(workbook, { base64: true });

        res.send(wbout);

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

        const productDataHeaders = await this.miniStoreProductsService.getEntityMetaData();

        const products: any = this.xlsWorkbookToJSON<MiniStoreProduct>(workBook, {
            defaultValue: null,
            range: 'A2:W500',
            headers: productDataHeaders,
        });

        const productToAdd = {} as MiniStoreProduct;

        for (const product of (products.Layout as MiniStoreProduct[])) {

            if (product.name === null) {
                break;
            } else {
                for (const key in product) {
                    productToAdd[key] = product[key];
                }
                try {
                    const measureId = unitMeasurements.find((unit) => {
                        // @ts-ignore
                        return unit.name === product.unitMeasurement;
                    });
                    productToAdd.isActive = true;
                    productToAdd.isFavorite = false;
                    productToAdd.unitMeasurement = measureId.id;
                    productToAdd.storePriceList = await this.miniStorePricesListsService.getListLike(String(product.storePriceList)) as MiniStorePriceList;
                    productToAdd.storeInvoiceKey = await this.invoiceKeysService.getInvoiceKeyLike(String(product.storeInvoiceKey)) as InvoiceKeys;
                    productToAdd.storeClassification = await this.miniStoreClassificationsService.getClasificationLike(String(product.storeClassification)) as MiniStoreClassification;
                    productToAdd.branchOffice = await this.branchOfficeService.getBranchLike(String(product.branchOffice)) as BranchOffice;

                } catch (e) {
                    console.log('error en añadir al objeto');
                    return res.send({ success: false, error: e });
                }

                try {
                    await this.miniStoreProductsService.createProduct(productToAdd);
                } catch (e) {
                    console.log('error al guardar objecto');
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
        }

        return res.send({ success: true });
    }

    @Post('download-layout-students')
    async downloadLayoutStudents() {
        const fields = {
            id: 'id',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            version: 'version',
            uuid: 'uuid',
            idFamily: 'idFamily',
            idCampus: 'idCampus',
            profilePicture: 'profilePicture',
            academiesModality: 'academiesModality',
            studentInscriptions: 'studentInscriptions',
            incidents: 'incidents',
            studentAcInscriptions: 'studentAcInscriptions',
            sales: 'sales',
            studentCharges: 'studentCharges',
            academyCharges: 'academyCharges',
            searchName: 'searchName',
            statusStudent: 'statusStudent',
        };
        const headers = await this.studentsService.getNamesAtributesStudents(fields);
        const layout = await generateTemplateStudents(new ExcelJS.Workbook(), headers);
        const relations = await this.studentsService.relationships();
        const dataCampus: any[] = [];
        const dataFamilies: any[] = [];
        relations.relations['BranchOffice'].map(item => {
            dataCampus.push([item.id, item.name]);
        });
        relations.relations['Family'].map(item => {
            dataFamilies.push([item.id, item.name]);
        });
        const workBook = await generateCatalog(layout, dataCampus, dataFamilies);
        return await convertToXlsx(workBook);
    }

    @Post('download-layout-inscriptions')
    async downloadLayoutInscriptions() {
        const fields = {
            id: 'id',

            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            version: 'version',
            uuid: 'uuid',
            inscripAgentCreator: 'inscripAgentCreator',
            inscripAgentEditor: 'inscripAgentEditor',
            inscripAssignmentsInscription: 'inscripAssignmentsInscription',
            inscripLevel: 'inscripLevel',
            inscripCycle: 'inscripCycle',
            inscripCampus: 'inscripCampus',
        };
        const headers = await this.inscriptionService.getNamesAttributesInscriptions(fields);
        const layout = await generateTemplateInscriptions(new ExcelJS.Workbook(), headers);
        return await convertToXlsx(layout);
    }

    @Post('download-catalogs-inscriptions')
    async downloadCatalogsInscriptions() {
        const { relations } = await this.inscriptionService.relationships();
        const columns: ColumnsCatalog[] = [];
        let tableHeader: any[] = [{ name: 'ID' }, { name: 'Nombre' }];
        let tableRows: any[] = [];
        Object.keys(relations).map((key, index) => {
            tableRows = [];
            relations[key].map((item) => {
                if (item.name && item.lastNameFather && item.lastNameMother) {
                    tableRows.push([item.id, `${item.name} ${item.lastNameMother} ${item.lastNameMother}`]);
                } else {
                    tableRows.push([item.id, item.name ? item.name : item.description]);
                }
            });
            columns.push({ tableName: key, cell: `A1`, columns: tableHeader, rows: tableRows });
        });
        const paymensPlayWithConcepts = await this.paymentPlansService.getPaymentsPlayWithConcepts();
        let paymentsRows: any[] = []
        paymensPlayWithConcepts.map((curr, index) => {
            curr.paymentPlanConcepts.map((val) => {
                paymentsRows.push([curr.id, curr.name, val.name]);
            });
        });
        const catalog = await setCatalog(new ExcelJS.Workbook(), columns);
        const sheetConcepts = catalog.addWorksheet('CONCEPTOS POR PLANES DE PAGO');
        sheetConcepts.addTable({
            name: 'CONCEPTOS',
            ref: 'A1',
            headerRow: true,
            columns: [{ name: 'ID' }, { name: 'Plan de pago' }, { name: 'Concepto' }],
            rows: paymentsRows
        })
        return await convertToXlsx(catalog);
    }

    @Post('bulk-inscriptions')
    async bulkInscriptionsByLayout(@Body() request) {
        await this.inscriptionService.repo.save(request);
    }

    @Post('bulk-students')
    @UseInterceptors(FileInterceptor('file', { dest: '/var/www/uploads/temp' }))
    async bulkStudentsByLayout(@UploadedFile() file: Express.Multer.File) {
        const uploadedFile = fs.readFileSync(file.path);
        const workBook = xlsx.read(uploadedFile);
        const fields = {
            id: 'id',
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            version: 'version',
            uuid: 'uuid',
            idFamily: 'idFamily',
            idCampus: 'idCampus',
            profilePicture: 'profilePicture',
            academiesModality: 'academiesModality',
            studentInscriptions: 'studentInscriptions',
            incidents: 'incidents',
            studentAcInscriptions: 'studentAcInscriptions',
            sales: 'sales',
            studentCharges: 'studentCharges',
            academyCharges: 'academyCharges',
            searchName: 'searchName',
            statusStudent: 'statusStudent',
        };
        const headers = await this.studentsService.getNamesAtributesStudents(fields);
        const students: any[] = this.xlsWorkbookToJSON<Student>(workBook, {
            defaultValue: null,
            range: 'A2:W500',
            headers,
        });
        const families: Family[] = [];
        const studentsData: Student[] = [];
        try {
            for (const student of (students['Layout'] as Student[])) {
                const family = await this.familyService.repo.findOne({ lastNameFather: student.lastNameFather, lastNameMother: student.lastNameMother });
                if (student.family === null && typeof family === 'undefined') {
                    studentsData.push({
                        ...student,
                        searchName: `${student.name} ${student.lastNameFather} ${student.lastNameMother}`,
                        family: {
                            name: `${student.lastNameFather} ${student.lastNameMother}`,
                            lastNameFather: student.lastNameFather,
                            lastNameMother: student.lastNameMother,
                            idCampus: student.studentCampus,
                            isActive: 1,
                        } as unknown as Family,
                    } as Student);
                }
                if (typeof family !== 'undefined') {
                    studentsData.push({
                        ...student,
                        searchName: `${student.name} ${student.lastNameFather} ${student.lastNameMother}`,
                        family: { id: student.family } as unknown as Family,
                    } as Student);
                }
            }
            fs.unlinkSync(`/var/www/uploads/temp/${file.filename}`);
            return await this.studentsService.bulkStudents(studentsData);
        } catch (e) {
            console.error(e.message);
            return e.message;
        }
    }

    @Post('validate-inscriptions-import')
    async validateDataInscription(@Body() request) {
        const inscriptions = request.data.value;
        const dataPre = request.dataPre.value;
        return await this.inscriptionService.validateData(inscriptions, dataPre);
    }
}
