import { EntitySubscriberInterface, EventSubscriber, getRepository, InsertEvent, UpdateEvent } from 'typeorm';
import { ColegioDBNameConnection } from '../../../../databases/colegiodb.service';
import { MiniStoreSalePayment } from '../entities/mini-store-sale-payment.entity';

@EventSubscriber()
export class MiniStoreSalesPaymentsSubscriber implements EntitySubscriberInterface<MiniStoreSalePayment> {
    private currentMiniStoreSalesPaymentValue: MiniStoreSalePayment | null = null;

    listenTo() {
        return MiniStoreSalePayment;
    }

    async afterInsert(insertEvent: InsertEvent<MiniStoreSalePayment>) {
        const { entity: payment } = insertEvent;
        await this.generateDocFolio(payment.id);
    }

    async beforeUpdate(updateEvent: UpdateEvent<MiniStoreSalePayment>) {
        const { databaseEntity: order } = updateEvent;
        // this.currentOrder = order;
    }

    async afterUpdate(updateEvent: UpdateEvent<MiniStoreSalePayment>) {
        const { entity: order } = updateEvent;
    }

    async generateDocFolio(id: number): Promise<MiniStoreSalePayment> {
        const servicePayments = getRepository(MiniStoreSalePayment, ColegioDBNameConnection);
        const updatePayment = await servicePayments.findOne({ id });
        console.log('new pago' + updatePayment.folio + ' NTTPA-' + updatePayment.id);
        updatePayment.folio = 'NTTPA-' + updatePayment.id;
        return await servicePayments.save(updatePayment);
    }
}
