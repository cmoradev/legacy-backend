import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { BranchOffice } from '../entities/branch-office.entity';
import { BranchType } from '../../../invoice/interface/FolioInvoice.interface';

export default class BranchOfficeInsertUpdateSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const list: BranchOffice[] = [
            {
                id: 1,
                name: 'Sucursal',
                BranchType: BranchType.matriz,
                Email: 'test@gmail.com',
                UserEmail: 'test',
                EmailPass: 'test',
                uuid: '11b0eed2-5da5-11eb-ae93-0242ac130002',
                version: 1,
                idLocation: 1,
                FolioOrder: 0,
                PrefixOrder: 'ORDEN',
            } as BranchOffice,
        ];
        await connection
          .createQueryBuilder()
          .insert()
          .into(BranchOffice)
          .values(list)
          .orUpdate({
              conflict_target: ['id']
          })
          .orIgnore()// para ignorar valores duplicado
          .execute();

    }
}
