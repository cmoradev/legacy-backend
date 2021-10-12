import { EntitySubscriberInterface, EventSubscriber, getRepository, InsertEvent, UpdateEvent } from 'typeorm';
import { ColegioDBNameConnection } from '../../../../common/databases/colegiodb.service';
import { PaymentStatus } from '../../../../common/enums/PaymentStatus';
import { AcademyChargeDetails } from '../entities/academy-charge-details.entity';
import { AcademyInscriptionConcepts } from '../../../academy-inscription-concepts/entities/academy-inscription-concepts.entity';

@EventSubscriber()
export class AcademyChargeDetailsSubscriber implements EntitySubscriberInterface<AcademyChargeDetails> {
    private currentMiniStoreSaleValue: AcademyChargeDetails | null = null;

    listenTo() {
        return AcademyChargeDetails;
    }

    async beforeInsert(insertEvent: InsertEvent<AcademyChargeDetails>) {
        const { entity: sale } = insertEvent;
        console.log(sale, 'amir');
    }

    async afterInsert(insertEvent: InsertEvent<AcademyChargeDetails>) {
        const { entity: details } = insertEvent;
        this.changeStatusConcept(details.academyInscriptionConcept.id);
    }

    async beforeUpdate(updateEvent: UpdateEvent<AcademyChargeDetails>) {
        const { databaseEntity: order } = updateEvent;
        // this.currentOrder = order;
    }

    async afterUpdate(updateEvent: UpdateEvent<AcademyChargeDetails>) {
        const { entity: order } = updateEvent;
    }

    async changeStatusConcept(id: number): Promise<AcademyInscriptionConcepts> {
        const insRepository = getRepository(AcademyInscriptionConcepts, ColegioDBNameConnection);
        const updateIns = await insRepository.findOne({ id });
        updateIns.paidDate = new Date();
        updateIns.paymentStatus = PaymentStatus.PaiOut;
        return insRepository.save(updateIns);
    }
}
