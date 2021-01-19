import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';
import { Department } from '../../../system/departments/entities/department.entity';
import * as moment from 'moment';
import { Base } from '../../../common/orm/entities/base.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

enum StatusCheckIn {
    Inside = 'Inside',
    Outside = 'Outside',
    NotRecognized = 'NotRecognized',
    Processing = 'Processing',
}

@ObjectType()
@Entity()
export class CheckIn extends Base {

    @Field()
    @Column({
        type: 'varchar',
        nullable: false,
    })
    name: string;

    @Field()
    @Column({
        type: 'text',
        nullable: false,
    })
    reason: string;

    @Field()
    @Column({
        type: 'varchar',
        nullable: true,
    })
    signature: string;

    @Field()
    @Column({
        type: 'timestamp',
        nullable: true,
    })
    entryHour: Date

    @Field({  nullable: true })
    @Column({
        type: 'timestamp',
        nullable: true,
    })
    exitHour: Date;

    @Field()
    @Column({
        type: 'simple-enum',
        enum: StatusCheckIn,
        nullable: false,
    })
    status: StatusCheckIn;

    @Field(type => Int)
    @Column({
        type: 'tinyint',
        nullable: false,
        default: () => '\'0\'',
    })
    isDating: boolean;

    @Field(type => Department)
    @ManyToOne(() => Department, (department) => department.inputRecords)
    department: Department;

    @Field()
    @Column('varchar', {
        nullable: true,
    })
    guestBadgeCode: string;

    @BeforeInsert()
    checkInEntryHour() {
        // @ts-ignore
        this.entryHour = moment().toISOString();
        this.status = StatusCheckIn.Inside;
    }

}
