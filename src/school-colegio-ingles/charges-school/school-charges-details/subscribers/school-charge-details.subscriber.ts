import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { SchoolChargeDetails } from '../entities/school-charge-details.entity';

@EventSubscriber()
export class SchoolChargeDetailsSubscriber implements EntitySubscriberInterface<SchoolChargeDetails> {

    listenTo() {
        return SchoolChargeDetails;
    }

    async beforeInsert(insertEvent: InsertEvent<SchoolChargeDetails>) {
    }

    async afterInsert(insertEvent: InsertEvent<SchoolChargeDetails>) {
    }

    async beforeUpdate(updateEvent: UpdateEvent<SchoolChargeDetails>) {
    }

    async afterUpdate(updateEvent: UpdateEvent<SchoolChargeDetails>) {
    }
}
