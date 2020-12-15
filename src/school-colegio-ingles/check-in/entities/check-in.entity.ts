import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';
import { Department } from '../../../system/departments/entities/department.entity';
import * as moment from 'moment';
import { Base } from '../../../common/orm/entities/base.entity';

enum StatusCheckIn {
    Inside = 'Inside',
    Outside = 'Outside',
    NotRecognized = 'NotRecognized',
    Processing = 'Processing',
}

@Entity()
export class CheckIn extends Base {

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
        type: 'simple-enum',
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

    @BeforeInsert()
    checkInEntryHour() {
        this.entryHour = moment().toISOString();
        this.status = StatusCheckIn.Inside;
    }

}
