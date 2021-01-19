import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Action } from '../../actions/entities/action.entity';
import { Route } from '../../routes/entities/route.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('route_action')
export class RouteAction {

    @Field(type => ID)
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Field(type => Route)
    @ManyToOne(type => Route, route => route.routeActions)
    route: Route;

    @Field(type => Action)
    @ManyToOne(type => Action, action => action.routeActions)
    action: Action;
}
