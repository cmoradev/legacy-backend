import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { InvoiceKeys } from '../entities/invoice-keys.entity';
import { catalogokeys } from './keys.catalogue';


export default class KeysInsertUpdateSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.getRepository(InvoiceKeys).save(catalogokeys);
    }
}

