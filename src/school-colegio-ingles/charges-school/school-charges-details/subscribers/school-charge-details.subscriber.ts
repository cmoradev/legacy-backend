import { EntitySubscriberInterface, EventSubscriber, getRepository, InsertEvent, UpdateEvent } from 'typeorm';
import { SchoolChargeDetails } from '../entities/school-charge-details.entity';
import { ColegioDBNameConnection } from '../../../../common/databases/colegiodb.service';
import { SchoolPayment } from '../../../school-payments/entities/school-payment.entity';
import { PaymentStatus } from '../../../../common/enums/PaymentStatus';

@EventSubscriber()
export class SchoolChargeDetailsSubscriber implements EntitySubscriberInterface<SchoolChargeDetails> {
    private currentMiniStoreSaleValue: SchoolChargeDetails | null = null;

    listenTo() {
        return SchoolChargeDetails;
    }

    async beforeInsert(insertEvent: InsertEvent<SchoolChargeDetails>) {
        const { entity: sale } = insertEvent;
  
    }

    async afterInsert(insertEvent: InsertEvent<SchoolChargeDetails>) {
        const { entity: details } = insertEvent;
        this.changeStatusSchoolPayment(details.schoolPlanPayment.id);
    }

    async beforeUpdate(updateEvent: UpdateEvent<SchoolChargeDetails>) {
        const { databaseEntity: order } = updateEvent;
        // this.currentOrder = order;
    }

    async afterUpdate(updateEvent: UpdateEvent<SchoolChargeDetails>) {
        const { entity: order } = updateEvent;
    }

    async changeStatusSchoolPayment(id: number): Promise<SchoolPayment> {
        const insRepository = getRepository(SchoolPayment, ColegioDBNameConnection);
        const updateIns = await insRepository.findOne({ id });
        updateIns.statusPayment = PaymentStatus.PaiOut;
        return insRepository.save(updateIns);
    }
}
