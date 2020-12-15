import {
  Column,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { MiniStoreProduct } from '../../../mini-store/mini-store-products/entities/mini-store-product.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('facturacion_claves')
export class InvoiceKeys extends Base {

  @Column('varchar', {
    nullable: false,
    length: 200,
    name: 'nombre',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    length: 80,
    name: 'clave',
  })
  key: string;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_unidad',
  })
  idUnidad: number;

  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_razon_social',
  })
  idRazonSocial: number;

  @OneToMany(() => MiniStoreProduct, (storeProduct) => storeProduct.storeInvoiceKey)
  storeProducts: MiniStoreProduct[];
}
