import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { MiniStoreWarehouseOrder } from '../../mini-store-warehouse-orders/entities/mini-store-warehouse-order.entity';
import { MiniStoreProductsProviders } from '../../mini-store-products-providers/entities/mini-store-products-providers.entity';

@Entity('tie_almacen_proveedores')
export class MiniStoreWarehouseProvider {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

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

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date | null;

    @OneToMany(() => MiniStoreWarehouseOrder, (miniStoreWarehouseOrder) => miniStoreWarehouseOrder.miniStoreWarehouseProvider)
    miniStoreWarehouseOrders: MiniStoreWarehouseOrder[];

    @OneToMany(() => MiniStoreProductsProviders, (mStore) => mStore.provider)
    miniStoreProductsProvider: MiniStoreProductsProviders[];
}
