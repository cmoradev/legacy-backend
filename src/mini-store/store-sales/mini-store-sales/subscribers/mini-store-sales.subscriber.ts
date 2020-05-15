import { EntitySubscriberInterface, EventSubscriber, getRepository, InsertEvent, UpdateEvent } from 'typeorm';
import { MiniStoreSale } from '../entities/mini-store-sale.entity';
import { ColegioDBNameConnection } from '../../../../databases/colegiodb.service';
import { BranchOfficeSetting } from '../../../../system/branch-office-setting/entities/branch-office-setting.entity';
import { CashRegisterTransaction } from '../../../cash-register-transactions/entities/cash-register-transaction.entity';
import { CashRegisterTransactionType } from '../../../cash-register-transactions/enums/cash-register-transaction-type.enum';
import { CashRegister } from '../../../cash-register/entities/cash-register.entity';

@EventSubscriber()
export class MiniStoreSaleSubscriber implements EntitySubscriberInterface<MiniStoreSale> {
    private currentMiniStoreSaleValue: MiniStoreSale | null = null;

    listenTo() {
        return MiniStoreSale;
    }

    async afterInsert(insertEvent: InsertEvent<MiniStoreSale>) {
        const { entity: sale } = insertEvent;
        try {
            this.generateDocFolio(sale.id);
        } catch (e) {
            console.log('ventas :' + sale.id, 'error', e);
        }
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
        const business = getRepository(BranchOfficeSetting, ColegioDBNameConnection);
        const miniStore = await business.findOne({ id: 3 });
        const updateIns = await insRepository.findOne({ id });
        updateIns.folio = miniStore.foliajeNota + updateIns.id;
        return await insRepository.save(updateIns);
    }

}
