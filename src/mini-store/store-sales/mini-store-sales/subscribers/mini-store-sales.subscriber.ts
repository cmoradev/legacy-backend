import { EntitySubscriberInterface, EventSubscriber, getRepository, InsertEvent, UpdateEvent } from 'typeorm';
import { MiniStoreSale } from '../entities/mini-store-sale.entity';
import { AcademyInscription } from '../../../../academy/academy-inscription/entities/academy-inscription.entity';
import { ColegioDBNameConnection } from '../../../../databases/colegiodb.service';
import { InvoiceCompany } from '../../../../invoice/invoice-company/entities/invoice-company.entity';

@EventSubscriber()
export class MiniStoreSaleSubscriber implements EntitySubscriberInterface<MiniStoreSale> {
    private currentMiniStoreSaleValue: MiniStoreSale | null = null;

    listenTo() {
        return MiniStoreSale;
    }

    async afterInsert(insertEvent: InsertEvent<MiniStoreSale>) {
        const { entity: sale } = insertEvent;
        this.generateDocFolio(sale.id);
    }

    async beforeUpdate(updateEvent: UpdateEvent<MiniStoreSale>) {
        const { databaseEntity: order } = updateEvent;
        // this.currentOrder = order;
    }

    async afterUpdate(updateEvent: UpdateEvent<MiniStoreSale>) {
        const { entity: order } = updateEvent;
    }

    async generateDocFolio(id: number): Promise<MiniStoreSale> {
        const insRepository = getRepository(MiniStoreSale, ColegioDBNameConnection);
        const business = getRepository(InvoiceCompany, ColegioDBNameConnection);
        const miniStore = await business.findOne({ id: 3 });
        const updateIns = await insRepository.findOne({ id });
        console.log('new sale' + miniStore.foliajeNota + updateIns.id);
        updateIns.folio = miniStore.foliajeNota + updateIns.id;
        return insRepository.save(updateIns);
    }
}
