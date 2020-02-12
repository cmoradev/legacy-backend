import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    RelationId,
} from 'typeorm';

@Entity('ac_cobro_forma_pago')
export class AcademyChargeWayOfPaying {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @Column('int', {
        nullable: false,
        name: 'id_forma_pago',
    })
    idFormaPago: number;

    @Column('varchar', {
        nullable: false,
        length: 10,
        name: 'codigo_forma_pago',
    })
    codigoFormaPago: string;

    @Column('varchar', {
        nullable: true,
        name: 'nombre_forma_pago',
    })
    nombreFormaPago: string | null;

    @Column('decimal', {
        nullable: false,
        default: () => '0.000000',
        precision: 15,
        scale: 6,
        name: 'cantidad',
    })
    cantidad: number;

    @Column('int', {
        nullable: false,
        default: () => '\'0\'',
        name: 'id_banco',
    })
    idBanco: number;

    @Column('varchar', {
        nullable: true,
        length: 200,
        name: 'banco',
    })
    banco: string | null;

    @Column('date', {
        nullable: true,
        name: 'fecha',
    })
    fecha: string | null;

    @Column('varchar', {
        nullable: false,
        length: 90,
        name: 'cuenta',
    })
    cuenta: string;

    @Column('int', {
        nullable: false,
        name: 'id_ac_cobro',
    })
    idAcCobro: number;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt: Date;

}
