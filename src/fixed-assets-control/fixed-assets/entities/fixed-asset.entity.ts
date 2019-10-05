import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FixedAsset {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    model: string;

    @Column()
    brand: string;

    @Column()
    serie: string;

    @Column({
        type: 'decimal',
        nullable: false,
        default: () => '\'0.000000\'',
        precision: 15,
        scale: 6,
    })
    purchasePrice: number;

    @Column()
    purchaseDate: Date;

    @Column()
    invoiceUrl: string;

    @Column()
    photoUrl: string;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt?: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    })
    updatedAt?: Date;
}
