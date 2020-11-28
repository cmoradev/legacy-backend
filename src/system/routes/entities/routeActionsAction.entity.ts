import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from '../../../common/orm/entities/base.entity';

@Entity('route_actions_action')
export class RouteActionsAction extends Base {

    @Column('int', { nullable: true })
    routeId;

    @Column('int', { nullable: true })
    actionId;

}
