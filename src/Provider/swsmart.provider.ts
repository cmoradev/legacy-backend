import { Provider } from '@nestjs/common';
import { FactMod } from '../webService/factMod';
import { FactSw } from '../webService/FactSw';

export const SmartWeb: Provider<FactSw> = {
    provide: FactSw,
    useClass: FactSw,
    useFactory: () => {
        return new FactSw();
    },
};
