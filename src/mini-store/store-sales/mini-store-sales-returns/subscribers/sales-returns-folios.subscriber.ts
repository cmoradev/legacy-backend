import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { SalesReturns } from '../entities/sales-returns.entity';

@EventSubscriber()
export class SalesReturnsFolios implements EntitySubscriberInterface<SalesReturns> {
  listenTo() {
    return SalesReturns;
  }

  async beforeInsert(saleReturn: InsertEvent<SalesReturns>) {
    let returnedSalesTotal = await saleReturn.connection.getRepository(SalesReturns).count();
    const folioToCheck = 'NCPDC-' + returnedSalesTotal;
    let found = false;
    while (found) {
      const results = await saleReturn.connection.getRepository(SalesReturns).find({
        where: {
          folio: folioToCheck,
        },
      });
      found = results.length > 0;
      if (found) {
        returnedSalesTotal += 1;
      }
    }
    if (returnedSalesTotal === 0) {
      returnedSalesTotal = 1;
    }

    const folio = 'NCPDC-' + returnedSalesTotal;
    saleReturn.entity.folio = folio;
  }

  public toNumber(value: string | number) {
    return +value;
  }
}