import {
  Column,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { MiniStoreProduct } from '../../../mini-store/mini-store-products/entities/mini-store-product.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('facturacion_claves')
export class InvoiceKeys extends Base {

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 200,
    name: 'nombre',
  })
  name: string;

  @Field()
  @Column('varchar', {
    nullable: false,
    length: 80,
    name: 'clave',
  })
  key: string;

  @Field(type => Int)
  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_unidad',
  })
  idUnidad: number;

  @Field(type => Int)
  @Column('int', {
    nullable: false,
    default: () => '\'0\'',
    name: 'id_razon_social',
  })
  idRazonSocial: number;

  @Field(type => [MiniStoreProduct])
  @OneToMany(() => MiniStoreProduct, (storeProduct) => storeProduct.storeInvoiceKey)
  storeProducts: MiniStoreProduct[];
}
