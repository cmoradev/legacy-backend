import { MaxLength } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RequestRemoveSelectedDetailsInput {

    @Field(type => Int)
    id: string;

    @Field()
    applicantName: string;

    @Field(type => Int)
    amountToRemove: number;
}

@InputType()
export class NewSaleMiniStore {

    @Field()
    branchOfficeId: number;

    @Field(type => Int)
    quantity: number;
}
