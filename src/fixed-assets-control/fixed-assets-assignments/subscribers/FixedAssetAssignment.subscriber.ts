import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { FixedAssetAssignment, FixedAssetAssignmentStatus } from '../entities/fixed-asset-assignment.entity';
import { FixedAsset, FixedAssetStatus } from '../../fixed-assets/entities/fixed-asset.entity';

@EventSubscriber()
export class FixedAssetAssignmentSubscriber implements EntitySubscriberInterface<FixedAssetAssignment> {

    listenTo() {
        return FixedAssetAssignment;
    }

    async afterInsert(event: InsertEvent<FixedAssetAssignment>) {
        const fixedAssetRepository = event.connection.getRepository<FixedAsset>(FixedAsset);
        fixedAssetRepository.findOne(event.entity.fixedAsset.id).then((fixedAssetToUpdate) => {
            fixedAssetToUpdate.status = FixedAssetStatus.Assigned;
            fixedAssetRepository.save(fixedAssetToUpdate);
        }).catch(() => {
            // TODO: Make rollback
        });
    }

    async afterUpdate(event: UpdateEvent<FixedAssetAssignment>) {
        const fixedAssetAssignmentUpdating = await event.connection
            .getRepository<FixedAssetAssignment>(FixedAssetAssignment)
            .findOne(event.entity.id, {
                relations: ['fixedAsset'],
            });
        const fixedAssetRepository = event.connection.getRepository<FixedAsset>(FixedAsset);
        let fixedAssetToUpdate = await fixedAssetRepository.findOne(fixedAssetAssignmentUpdating.fixedAsset.id);
        fixedAssetToUpdate = this.defineFixedAssetStatus({
            fixedAssetToUpdate,
            status: event.entity.status,
        });
        fixedAssetRepository.save(fixedAssetToUpdate);
    }

    defineFixedAssetStatus(parameters: {
        status: FixedAssetAssignmentStatus,
        fixedAssetToUpdate: FixedAsset,
    }): FixedAsset {
        const { fixedAssetToUpdate, status } = parameters;
        switch (status) {
            case FixedAssetAssignmentStatus.Assigned:
                fixedAssetToUpdate.status = FixedAssetStatus.Assigned;
                break;
            case FixedAssetAssignmentStatus.Returned:
                fixedAssetToUpdate.status = FixedAssetStatus.Available;
                break;
            case FixedAssetAssignmentStatus.NotReturned:
                fixedAssetToUpdate.status = FixedAssetStatus.NotAvailable;
                break;
        }
        return fixedAssetToUpdate;
    }
}
