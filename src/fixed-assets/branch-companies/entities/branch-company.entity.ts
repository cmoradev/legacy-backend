import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MatrixCompany } from '../../matrix-company/entities/matrix-company.entity';

@Entity()
export class BranchCompany {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => MatrixCompany, matrix => matrix.branches)
    matrixCompany: MatrixCompany;
}
