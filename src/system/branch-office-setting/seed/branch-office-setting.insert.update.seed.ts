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
                address: 'Calle 72 entre Av. Sian Ka’an y, Carr. Federal Mza. 026-Lote 03, Ejidal, 77714 Playa del Carmen, Q.R.',
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
            {
                id: 2,
                name: 'Academia',
                uuid: '4e4d8e0c-dbe0-4dbb-97f2-5c56e33a3a63',
                version: 1,
                rfc: 'XAXX010101000',
                businessName: 'Muunyal',
                address: 'Calle 72 entre Av. Sian Ka’an y, Carr. Federal Mza. 026-Lote 03, Ejidal, 77714 Playa del Carmen, Q.R.',
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
                typeModule: TypeModule.academia,
                isActive: true,
                isQuickSale: false,
                invoiceCampus: {
                    id: 1,
                },
            } as BranchOfficeSetting,
            {
                id: 3,
                name: 'Colegio',
                uuid: '652681e0-6f29-46d5-b643-5fd952c34b07',
                version: 1,
                rfc: 'XAXX010101000',
                businessName: 'Muunyal',
                address: 'Calle 72 entre Av. Sian Ka’an y, Carr. Federal Mza. 026-Lote 03, Ejidal, 77714 Playa del Carmen, Q.R.',
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
                typeModule: TypeModule.colegio,
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
              conflict_target: ['id']
          })
          .orIgnore()// para ignorar valores duplicado
          .execute();

    }
}
