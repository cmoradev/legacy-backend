import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MatrixCompany {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
