import { Query, Resolver } from '@nestjs/graphql';
import { MiniStoreSale } from './entities/mini-store-sale.entity';
import { MiniStoreSalesService } from './mini-store-sales.service';

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
}
