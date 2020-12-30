import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Base } from '../../../../common/orm/entities/base.entity';
import { Route } from '../../../../system/routes/entities/route.entity';
import { MiniStoreSale } from '../../mini-store-sales/entities/mini-store-sale.entity';

@Entity('mini_store_quotation')
export class MiniStoreQuotation extends Base {

  @OneToOne(type => MiniStoreSale, sale => sale.sale, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  sale: MiniStoreSale;

  @OneToOne(type => MiniStoreSale, sale => sale.quotation, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  quotation: MiniStoreSale;

}
