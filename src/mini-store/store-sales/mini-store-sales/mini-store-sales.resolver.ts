import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { MiniStoreSalesService } from './mini-store-sales.service';
import { PubSub } from 'graphql-subscriptions';
import { OkGraphql } from './models/ok.graphql';
import { NewSaleMiniStore, RequestRemoveSelectedDetailsInput } from './models/request-remove-selected-details.input';
import {
    ResponseNewSaleMiniStore,
    ResponseRemoveSelectedDetailsGql,
} from './models/response-remove-selected-details.gql';

const pubSub = new PubSub();

@Resolver(of => MiniStoreSale)
export class MiniStoreSalesResolver {
    constructor(
      readonly service: MiniStoreSalesService,
    ) {
    }

    @Query(() => [MiniStoreSale], {})
    async sales(): Promise<MiniStoreSale[]> {
        return await this.service.repo.find();
    }

    @Mutation(returns => OkGraphql)
    async removeSelectedDetails(@Args('input') input: RequestRemoveSelectedDetailsInput): Promise<OkGraphql> {
        pubSub.publish('acceptor', { acceptor: input });
        const respuesta: OkGraphql = {
            status: 200,
            message: '',
        };
        return respuesta;
    }

    @Mutation(returns => OkGraphql)
    async minisStoreNewSale(@Args('input') input: NewSaleMiniStore): Promise<OkGraphql> {
        pubSub.publish('miniStoreListenNewSale', { miniStoreListenNewSale: input });
        const respuesta: OkGraphql = {
            status: 200,
            message: '',
        };
        return respuesta;
    }

    @Subscription(returns => ResponseNewSaleMiniStore)
    miniStoreListenNewSale() {
        return pubSub.asyncIterator('miniStoreListenNewSale');
    }

    @Subscription(returns => ResponseRemoveSelectedDetailsGql)
    acceptor() {
        return pubSub.asyncIterator('acceptor');
    }
}
