import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { InvoiceBanksCatalogue } from './invoices-bank.catalogue';
import { InvoicesBank } from '../entities/invoices-bank.entity';

export default class InvoicesBankSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.getRepository(InvoicesBank).save(InvoiceBanksCatalogue);
    }
}

