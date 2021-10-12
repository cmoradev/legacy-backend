import { EventSubscriber, EntitySubscriberInterface, UpdateEvent, InsertEvent, getRepository } from 'typeorm';
import { AcademyInscription } from '../entities/academy-inscription.entity';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import moment = require('moment');

@EventSubscriber()
export class AcademyInscriptionSubscriber implements EntitySubscriberInterface<AcademyInscription> {
  private currentAcInscriptionValue: AcademyInscription | null = null;

  listenTo() {
    return AcademyInscription;
  }

  async afterInsert(insertEvent: InsertEvent<AcademyInscription>) {
    const { entity: order } = insertEvent;
    this.registerKeyInscription(order.id, order.student.typeStudent + '-' + order.id);
  }

  async beforeUpdate(updateEvent: UpdateEvent<AcademyInscription>) {
    const { databaseEntity: order } = updateEvent;
    // this.currentOrder = order;
  }

  async afterUpdate(updateEvent: UpdateEvent<AcademyInscription>) {
    const { entity: order } = updateEvent;
  }

  async registerKeyInscription(idInscription: number, keyInscription: string): Promise<AcademyInscription> {
    const insRepository = getRepository(AcademyInscription, ColegioDBNameConnection);
    const updateIns = await insRepository.findOne({ id: idInscription });
    updateIns.keyInscription = keyInscription;
    updateIns.startDate = moment().format('YYYY-MM-DD');
    return insRepository.save(updateIns);
  }
}
