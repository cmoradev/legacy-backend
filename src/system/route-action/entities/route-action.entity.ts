import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Action } from '../../actions/entities/action.entity';
import { Route } from '../../routes/entities/route.entity';

@Entity('route_action')
export class RouteAction {

    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @ManyToOne(type => Route, route => route.routeActions, { primary: true })
    route: Route;

    @ManyToOne(type => Action, action => action.routeActions, { primary: true })
    action: Action;
}
