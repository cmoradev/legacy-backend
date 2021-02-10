import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { SchoolCharge } from './entities/school-charge.entity';

@EventSubscriber()
export class SchoolChargesSubscriber implements EntitySubscriberInterface<SchoolCharge> {
    private currentMiniStoreSaleValue: SchoolCharge | null = null;

    listenTo() {
        return SchoolCharge;
    }

    async beforeInsert(insertEvent: InsertEvent<SchoolCharge>) {
        const { entity: sale } = insertEvent;
        // console.log(sale, 'antes de guardar ' + sale.id);
    }

    async afterInsert(insertEvent: InsertEvent<SchoolCharge>) {
        const { entity: sale } = insertEvent;
        console.log(sale, 'antes despues de guardar ' + sale.id);

    }


}
