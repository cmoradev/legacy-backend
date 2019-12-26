import { EventSubscriber, EntitySubscriberInterface, UpdateEvent, InsertEvent } from 'typeorm';
import { AcademyInscription } from '../entities/academy-inscription.entity';

@EventSubscriber()
export class AcademyInscriptionSubscriber implements EntitySubscriberInterface<AcademyInscription> {
  private currentAcInscriptionValue: AcademyInscription | null = null;

  listenTo() {
    return AcademyInscription;
  }

  async afterInsert(insertEvent: InsertEvent<AcademyInscription>) {
    const { entity: order } = insertEvent;
    console.log('sucripcion amir: ' + order);
    // this.registerOrderStatus(order);
  }

  async beforeUpdate(updateEvent: UpdateEvent<AcademyInscription>) {
    const { databaseEntity: order } = updateEvent;
    // this.currentOrder = order;
  }

  async afterUpdate(updateEvent: UpdateEvent<AcademyInscription>) {
    const { entity: order } = updateEvent;
  }
}
