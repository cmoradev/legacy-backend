import { Column, Entity, OneToMany } from 'typeorm';
import { MiniStoreWarehouseOrder } from '../../mini-store-warehouse-orders/entities/mini-store-warehouse-order.entity';
import { MiniStoreProductsProviders } from '../../mini-store-products-providers/entities/mini-store-products-providers.entity';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity('tie_almacen_proveedores')
export class MiniStoreWarehouseProvider extends Base {


    @Field()
    @Column('varchar', {
        nullable: false,
        length: 45,
        name: 'nombre',
    })
    name: string;

    @Field()
    @Column('varchar', {
        nullable: false,
        length: 50,
        name: 'empresa',
    })
    business: string;

    @Field({ nullable: true})
    @Column('text', {
        nullable: true,
        name: 'url_logo',
    })
    logoURL: string | null;

    @Field({ nullable: true})
    @Column('varchar', {
        nullable: true,
        length: 5,
        name: 'cp',
    })
    zip: string | null;

    @Field({ nullable: true})
    @Column('varchar', {
        nullable: true,
        name: 'country',
    })
    country: string | null;

    @Field({ nullable: true})
    @Column('varchar', {
        nullable: true,
        name: 'stado',
    })
    state: string | null;

    @Field({ nullable: true})
    @Column('varchar', {
        nullable: true,
        name: 'city',
    })
    city: string | null;

    @Field({ nullable: true})
    @Column('varchar', {
        nullable: true,
        length: 200,
        name: 'colonia',
    })
    colony: string | null;

    @Field({ nullable: true})
    @Column('varchar', {
        nullable: true,
        length: 45,
        name: 'calle',
    })
    street: string | null;

    @Field({ nullable: true})
    @Column('varchar', {
        nullable: true,
        length: 14,
        name: 'rfc',
    })
    rfc: string | null;

    @Field({ nullable: true})
    @Column('varchar', {
        nullable: true,
        length: 45,
        name: 'telefono',
    })
    phone: string | null;

    @Field({ nullable: true})
    @Column('varchar', {
        nullable: true,
        length: 45,
        name: 'celular',
    })
    cellphone: string | null;

    @Field({ nullable: true})
    @Column('varchar', {
        nullable: true,
        length: 45,
        name: 'correo',
    })
    email: string | null;

    @Field({ nullable: true})
    @Column('text', {
        nullable: true,
        name: 'pweb',
    })
    webSite: string | null;

    @Field(type => [MiniStoreWarehouseOrder])
    @OneToMany(() => MiniStoreWarehouseOrder, (miniStoreWarehouseOrder) => miniStoreWarehouseOrder.miniStoreWarehouseProvider)
    miniStoreWarehouseOrders: MiniStoreWarehouseOrder[];

    @Field(type => [MiniStoreProductsProviders])
    @OneToMany(() => MiniStoreProductsProviders, (mStore) => mStore.provider)
    miniStoreProductsProvider: MiniStoreProductsProviders[];
}
