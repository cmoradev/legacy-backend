import { EntitySubscriberInterface, EventSubscriber, getRepository, InsertEvent, UpdateEvent } from 'typeorm';
import { ColegioDBNameConnection } from '../../../../common/databases/colegiodb.service';
import { MiniStoreTransaction } from '../entities/mini-store-transaction.entity';

@EventSubscriber()
export class MiniStoreTransactionsSubscriber implements EntitySubscriberInterface<MiniStoreTransaction> {
    private currentMiniStoreSaleValue: MiniStoreTransaction | null = null;

    listenTo() {
        return MiniStoreTransaction;
    }

    async afterInsert(insertEvent: InsertEvent<MiniStoreTransaction>) {
        const { entity: transactions } = insertEvent;
        this.generateDocFolio(transactions.id);
    }

    async beforeUpdate(updateEvent: UpdateEvent<MiniStoreTransaction>) {
        const { databaseEntity: order } = updateEvent;
        // this.currentOrder = order;
    }

    async afterUpdate(updateEvent: UpdateEvent<MiniStoreTransaction>) {
        const { entity: order } = updateEvent;
    }

    async generateDocFolio(id: number): Promise<MiniStoreTransaction> {
        const transRepository = getRepository(MiniStoreTransaction, ColegioDBNameConnection);
        const updateIns = await transRepository.findOne({ id });
        updateIns.folio = 'TR-' + updateIns.id;
        return transRepository.save(updateIns);
    }
}
