import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from '../../../system/departments/entities/department.entity';
import * as moment from 'moment';

enum StatusCheckIn {
    Inside = 'Inside',
    Outside = 'Outside',
    NotRecognized = 'NotRecognized',
    Processing = 'Processing',
}

@Entity()
export class CheckIn {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    name: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    reason: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    signature: string;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    entryHour: Date | string;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    exitHour: Date | string;

    @Column({
        type: 'enum',
        enum: StatusCheckIn,
        nullable: false,
    })
    status: StatusCheckIn;
    @Column({
        type: 'tinyint',
        nullable: false,
        default: () => '\'0\'',
    })
    isDating: boolean;

    @ManyToOne(() => Department, (department) => department.inputRecords)
    department: Department;

    @Column('varchar', {
        nullable: true,
    })
    guestBadgeCode: string;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @BeforeInsert()
    checkInEntryHour() {
        this.entryHour = moment().toISOString();
        this.status = StatusCheckIn.Inside;
    }

}
