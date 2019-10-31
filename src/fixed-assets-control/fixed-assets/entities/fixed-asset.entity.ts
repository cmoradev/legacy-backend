import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { FixedAssetAssignment } from '../../fixed-assets-assignments/entities/fixed-asset-assignment.entity';
import { BranchCompany } from '../../branch-companies/entities/branch-company.entity';
import { Classification } from '../../classifications/entities/classification.entity';
import { Location } from '../../locations/entities/location.entity';

export enum FixedAssetStatus {
    Available = 'Available',
    Assigned = 'Assigned',
    NotAvailable = 'NotAvailable',
}

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

    @Column({
        nullable: true,
    })
    invoiceUrl: string;

    @Column({
        nullable: true,
    })
    photoUrl: string;

    @Column({
        type: 'enum',
        enum: FixedAssetStatus,
        default: FixedAssetStatus.Available,
        nullable: false,
    })
    status: FixedAssetStatus;

    @ManyToOne(type => BranchCompany, branchCompany => branchCompany.fixedAssets,
        { nullable: false },
    )
    branchCompany: BranchCompany;

    @OneToMany(type => FixedAssetAssignment, assignment => assignment.fixedAsset)
    assignmentHistory: FixedAssetAssignment[];

    @ManyToOne(type => Classification, classification => classification.fixedAssets)
    classification: Classification;

    @ManyToOne(type => Location, location => location.fixedAssets,
        {
            nullable: true,
        })
    location: Location;

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
