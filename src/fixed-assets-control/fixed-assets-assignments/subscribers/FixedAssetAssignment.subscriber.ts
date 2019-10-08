import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { FixedAssetAssignment } from '../fixed-assets-control/fixed-assets-assignments/entities/fixed-asset-assignment.entity';
import { LoadEvent } from 'typeorm/subscriber/event/LoadEvent';

@EventSubscriber()
export class FixedAssetAssignmentSubscriber implements EntitySubscriberInterface<FixedAssetAssignment> {

    listenTo() {
        return FixedAssetAssignment;
    }

    afterLoad(entity: FixedAssetAssignment, event?: LoadEvent<FixedAssetAssignment>): Promise<any> | void {
        console.log('CARGANDO ENTIDAD', event.entity);
    }

    afterInsert(event: InsertEvent<FixedAssetAssignment>) {
        console.log(`BEFORE POST INSERTED: `, event.entity);
    }
}
