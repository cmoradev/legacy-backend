import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { methodsCatalogey } from './methods.catalogue';
import { InvoiceMethodPayment } from '../entities/invoice-method-payment.entity';


export default class InvoiceMethodsInsertUpdateSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.getRepository(InvoiceMethodPayment).save(methodsCatalogey);
    }
}

