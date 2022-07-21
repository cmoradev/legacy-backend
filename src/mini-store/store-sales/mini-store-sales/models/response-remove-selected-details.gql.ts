import { MaxLength } from 'class-validator';

export class ResponseRemoveSelectedDetailsGql {

    @MaxLength(50)
    id: string;

    applicantName: string;

    amountToRemove: number;
}

export class ResponseNewSaleMiniStore {
    branchOfficeId: number;

    quantity: number;
}
