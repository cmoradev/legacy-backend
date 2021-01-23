import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { BranchOfficeSetting } from '../entities/branch-office-setting.entity';
import { TypeModule } from '../../../invoice/interface/FolioInvoice.interface';

export default class BranchOfficeSettingInsertUpdateSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const list: BranchOfficeSetting[] = [
            {
                id: 1,
                name: 'Tienda',
                uuid: 'bf9ef104-5da7-11eb-ae93-0242ac130002',
                version: 1,
                rfc: 'XAXX010101000',
                businessName: 'Muunyal',
                address: 'CARRETERA FEDERAL CANCUN TULUM KM 292 MANZANA 24 LOTE 24 FRACCION 4 EJIDO PLAYA',
                regime: 601,
                fiscalRegime: '',
                zip: '77710',
                country: 1,
                foliajeNota: 'MYLV',
                serieNota: 0,
                foliajeFactura: 'MYLF',
                serieFactura: 0,
                serieFacturacion: 'A',
                foliajePago: 'MYLP',
                seriePago: 0,
                folioCotizacion: 'MYLC',
                serieCotizacion: 0,
                daysQuoteValid: 15,
                perCommissions: 10,
                cerCSD: '',
                keyCSD: '',
                password: '',
                email: '',
                bankAccount: '',
                typeModule: TypeModule.tienda,
                isActive: true,
                isQuickSale: false,
                invoiceCampus: {
                    id: 1,
                },
            } as BranchOfficeSetting,
        ];
        await connection
          .createQueryBuilder()
          .insert()
          .into(BranchOfficeSetting)
          .values(list)
          .orUpdate({
              conflict_target: ['id'],
              overwrite: [
                  'id',
                  'name',
                  'uuid',
                  'version',
                  'rfc',
                  'businessName',
                  'address',
                  'regime',
                  'fiscalRegime',
                  'zip',
                  'country',
                  'foliajeNota',
                  'serieNota',
                  'foliajeFactura',
                  'serieFactura',
                  'serieFacturacion',
                  'foliajePago',
                  'seriePago',
                  'folioCotizacion',
                  'serieCotizacion',
                  'daysQuoteValid',
                  'perCommissions',
                  'cerCSD',
                  'keyCSD',
                  'password',
                  'email',
                  'bankAccount',
                  'typeModule',
                  'isActive',
                  'isQuickSale',
                  'invoiceCampus',
              ],
          })
          .orIgnore()// para ignorar valores duplicado
          .execute();

    }
}
