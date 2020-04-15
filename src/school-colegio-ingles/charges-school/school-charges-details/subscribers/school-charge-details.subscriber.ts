import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { SchoolChargeDetails } from '../entities/school-charge-details.entity';

@EventSubscriber()
export class SchoolChargeDetailsSubscriber implements EntitySubscriberInterface<SchoolChargeDetails> {
    private currentMiniStoreSaleValue: SchoolChargeDetails | null = null;

    listenTo() {
        return SchoolChargeDetails;
    }

    async beforeInsert(insertEvent: InsertEvent<SchoolChargeDetails>) {
        const { entity: sale } = insertEvent;
        console.log(sale, 'amir');
    }

    async afterInsert(insertEvent: InsertEvent<SchoolChargeDetails>) {
        const { entity: sale } = insertEvent;
        // this.generateDocFolio(sale.id);
    }

    async beforeUpdate(updateEvent: UpdateEvent<SchoolChargeDetails>) {
        const { databaseEntity: order } = updateEvent;
        // this.currentOrder = order;
    }

    async afterUpdate(updateEvent: UpdateEvent<SchoolChargeDetails>) {
        const { entity: order } = updateEvent;
    }

}
