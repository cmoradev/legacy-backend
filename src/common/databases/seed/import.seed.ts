import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import * as data from './ci-pdc-data.json'
import { MiniStoreProduct } from '../../../mini-store/mini-store-products/entities/mini-store-product.entity';
import { MiniStoreClassification } from '../../../mini-store/mini-store-classifications/entities/mini-store-classification.entity';

export class ImportSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        let updated = 0;
        let created = 0;

        const namesClassifications: string[] = [];
        const classifications: MiniStoreClassification[] = [];

        for (const row of data) {
            const ifExist = namesClassifications.find((value: string) => value === row.classification);

            if (!ifExist) {
                namesClassifications.push(row.classification)
            }
        }

        for (const row of namesClassifications) {
            const classification = await connection.getRepository(MiniStoreClassification).findOne({
                where: {name: row}
            });

            if (classification?.id) {
                classifications.push(classification)
            } else {
                const aux = await connection.getRepository(MiniStoreClassification).save({
                    name: row,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    version: 1
                });

                classifications.push(aux)
            }
        }

        for (const row of data) {
            const classification = classifications.find((value) => value.name === row.classification);

            const product = await connection.getRepository(MiniStoreProduct).findOne({where: {name: row.name, storePriceList: {id: 2}}});

            const priceWithIVA = parseFloat(`${row.price}`);
            const price = parseFloat(`${priceWithIVA / 1.16}`);

            if (product?.id) {
                // await connection.getRepository(MiniStoreProduct).update({id: product.id}, {
                //     name: `${row.name}`,
                //     description: `${row.name}`,
                //     code: `${row.code}`,
                //     priceWithIVA: `${priceWithIVA}`,
                //     price: `${price}`,
                //     stock: row.stock,
                //     storeClassification: {
                //         id: row.clasificationId
                //     },
                // } as MiniStoreProduct)

                updated++;
            } else {
                await connection.getRepository(MiniStoreProduct).save({
                    name: `${row.name}`,
                    description: `${row.description}`,
                    code: ``,
                    priceWithIVA: `${priceWithIVA}`,
                    price: `${price}`,
                    stock: row.stock,
                    storeClassification: {
                        id: classification.id
                    },
                    storePriceList: {
                        id: 2
                    },
                    branchOffice: {
                        id: 1
                    },
                    maxStock: row.maxStock,
                    minStock: row.minStock,
                    picture: 'https://api.hishop.mx/api/file/dark-logo.jpg',
                    priceProvider: '0.00',
                    IVA: true,
                    codeBar: '',
                    isActive: true,
                    isFavorite: false,
                    objetoImp: '02',
                    unity: 'PIEZA',
                    unitMeasurement: 'H87',
                    sat_code: '53102705',
                } as MiniStoreProduct)

                created++;
            }
        }


        console.log('TOTAL DE PRODUCTOS: ', data.length)
        console.log('')
        console.log('ENCONTRADOS: ', updated)
        console.log('NO ENCONTRADOS: ', created)

        console.log(JSON.stringify(classifications, null, 3))

    }
}
