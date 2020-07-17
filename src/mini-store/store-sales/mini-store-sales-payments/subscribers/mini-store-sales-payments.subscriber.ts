import { EntitySubscriberInterface, EventSubscriber, getRepository, InsertEvent, UpdateEvent } from 'typeorm';
import { ColegioDBNameConnection } from '../../../../databases/colegiodb.service';
import { MiniStoreSalePayment } from '../entities/mini-store-sale-payment.entity';
import { CashRegisterTransaction } from '../../../cash-register-transactions/entities/cash-register-transaction.entity';
import { MiniStoreSale } from '../../mini-store-sales/entities/mini-store-sale.entity';
import { CashRegister } from '../../../cash-register/entities/cash-register.entity';
import { CashRegisterTransactionType } from '../../../cash-register-transactions/enums/cash-register-transaction-type.enum';

@EventSubscriber()
export class MiniStoreSalesPaymentsSubscriber implements EntitySubscriberInterface<MiniStoreSalePayment> {
    private currentMiniStoreSalesPaymentValue: MiniStoreSalePayment | null = null;

    listenTo() {
        return MiniStoreSalePayment;
    }

    async afterInsert(insertEvent: InsertEvent<MiniStoreSalePayment>) {
        const { entity: payment } = insertEvent;
        try {
            this.generateTransaction(payment.id);
        } catch (e) {
            console.log('payment :' + payment, 'error', e);
        }
    }

    async beforeUpdate(updateEvent: UpdateEvent<MiniStoreSalePayment>) {
        const { databaseEntity: order } = updateEvent;
        // this.currentOrder = order;
    }

    async afterUpdate(updateEvent: UpdateEvent<MiniStoreSalePayment>) {
        const { entity: order } = updateEvent;
    }

    async generateFolioPayment(id: number): Promise<MiniStoreSalePayment> {
        const servicePayments = getRepository(MiniStoreSalePayment, ColegioDBNameConnection);
        const updatePayment = await servicePayments.findOne({ id });
        updatePayment.folio = 'NTTPA-' + updatePayment.id;
        return await servicePayments.save(updatePayment);
    }

    async generateTransaction(id: number): Promise<CashRegisterTransaction> {

        const serviceTransaction = getRepository(CashRegisterTransaction, ColegioDBNameConnection);
        const servicePayment = getRepository(MiniStoreSalePayment, ColegioDBNameConnection);

        const payment = await servicePayment.findOne({
            where: { id },
            relations: ['agent'],
        });

        const serviceCashRegister = await getRepository(CashRegister, ColegioDBNameConnection).findOne({
            where: {
                closedAt: null,
                agentId: payment.agent.id,
            },
        });
        const trasaction = new CashRegisterTransaction();
        trasaction.transactionType = CashRegisterTransactionType.income;
        trasaction.agent = payment.agent;
        trasaction.payment = payment;
        trasaction.cashRegister = serviceCashRegister;
        return await serviceTransaction.save(trasaction);
    }
}
