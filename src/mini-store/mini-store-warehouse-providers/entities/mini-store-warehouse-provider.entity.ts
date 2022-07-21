import { Column, Entity, OneToMany } from 'typeorm';
import { MiniStoreWarehouseOrder } from '../../mini-store-warehouse-orders/entities/mini-store-warehouse-order.entity';
import { MiniStoreProductsProviders } from '../../mini-store-products-providers/entities/mini-store-products-providers.entity';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('tie_almacen_proveedores')
export class MiniStoreWarehouseProvider extends Base {


    @Column('varchar', {
        nullable: false,
        length: 45,
        name: 'nombre',
    })
    name: string;

    @Column('varchar', {
        nullable: false,
        length: 50,
        name: 'empresa',
    })
    business: string;

    @Column('text', {
        nullable: true,
        name: 'url_logo',
    })
    logoURL: string | null;

    @Column('varchar', {
        nullable: true,
        length: 5,
        name: 'cp',
    })
    zip: string | null;

    @Column('varchar', {
        nullable: true,
        name: 'country',
    })
    country: string | null;

    @Column('varchar', {
        nullable: true,
        name: 'stado',
    })
    state: string | null;

    @Column('varchar', {
        nullable: true,
        name: 'city',
    })
    city: string | null;

    @Column('varchar', {
        nullable: true,
        length: 200,
        name: 'colonia',
    })
    colony: string | null;

    @Column('varchar', {
        nullable: true,
        length: 45,
        name: 'calle',
    })
    street: string | null;

    @Column('varchar', {
        nullable: true,
        length: 14,
        name: 'rfc',
    })
    rfc: string | null;

    @Column('varchar', {
        nullable: true,
        length: 45,
        name: 'telefono',
    })
    phone: string | null;

    @Column('varchar', {
        nullable: true,
        length: 45,
        name: 'celular',
    })
    cellphone: string | null;

    @Column('varchar', {
        nullable: true,
        length: 45,
        name: 'correo',
    })
    email: string | null;

    @Column('text', {
        nullable: true,
        name: 'pweb',
    })
    webSite: string | null;

    @OneToMany(() => MiniStoreWarehouseOrder, (miniStoreWarehouseOrder) => miniStoreWarehouseOrder.miniStoreWarehouseProvider)
    miniStoreWarehouseOrders: MiniStoreWarehouseOrder[];

    @OneToMany(() => MiniStoreProductsProviders, (mStore) => mStore.provider)
    miniStoreProductsProvider: MiniStoreProductsProviders[];
}
