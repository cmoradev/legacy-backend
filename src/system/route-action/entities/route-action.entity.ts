import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Action } from '../../actions/entities/action.entity';
import { Route } from '../../routes/entities/route.entity';

@Entity('route_action')
export class RouteAction {

    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @ManyToOne(type => Route, route => route.routeActions)
    route: Route;

    @ManyToOne(type => Action, action => action.routeActions)
    action: Action;
}
