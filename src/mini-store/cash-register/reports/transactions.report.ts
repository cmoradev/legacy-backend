import { CashRegister } from '../entities/cash-register.entity';
import { isInterface } from '@nestjs/swagger/dist/plugin/utils/ast-utils';

interface TransactionsData {
    action: '',
    type: string;
    observation: string;
    agent: string;
    quantity: string;
}

interface Convert {
    data: TransactionsData[]
    box: string;

}

export function transactionsList(registro: CashRegister): Convert {

    const r = {
        data: [],
        box: registro.initialAmount,
    };

    let re: any = {
        action: '',
        type: '',
        observation: '',
        agent: '',
        quantity: '',
    };
    for (const movimiento of registro.movements) {
        re.action = 'Movimiento';
        re.type = movimiento.transactionType;
        re.quantity = movimiento.quantity;
        re.agent = registro.agent.name;
        r.data.push(re);
        re = {
            action: '',
            type: '',
            observation: '',
            agent: '',
            quantity: '',
        };
    }
    for (const transaccion of registro.transactions) {
        re.action = 'Transacción';
        re.type = transaccion.transactionType;
        re.quantity = transaccion.payment.quantity;
        re.observation = transaccion.payment.observations;
        re.agent = transaccion.agent.name;
        r.data.push(re);
        re = {
            action: '',
            type: '',
            observation: '',
            agent: '',
            quantity: '',
        };
    }


    return r;
}
