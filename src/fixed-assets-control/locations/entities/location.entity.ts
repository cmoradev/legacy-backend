import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Department } from '../../../school-colegio-ingles/departments/entities/department.entity';
import { FixedAssetAssignment } from '../../fixed-assets-assignments/entities/fixed-asset-assignment.entity';

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @ManyToOne(type => Department,
        department => department.locations, {
            nullable: false,
        })
    department: Department;

    @OneToMany(type => FixedAssetAssignment,
        fixedAssetAssignmet => fixedAssetAssignmet.location)
    fixedAssetAssignments: FixedAssetAssignment[];

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
