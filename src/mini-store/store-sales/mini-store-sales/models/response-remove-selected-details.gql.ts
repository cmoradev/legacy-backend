import { MaxLength } from 'class-validator';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseRemoveSelectedDetailsGql {

    @Field()
    @MaxLength(50)
    id: string;

    @Field()
    applicantName: string;

    @Field(type => Int)
    amountToRemove: number;
}
