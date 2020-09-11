import { CashRegister } from '../entities/cash-register.entity';

export function transactionsList(registros: CashRegister[]): {
    action: '',
    type: string;
    observation: string;
    agent: string;
    quantity: string;
}[] {
    const data = [];
    for (const registro of registros) {
        let re: any = {
            action: '',
            type: '',
            observation: '',
            agent: '',
            quantity: '',
        };
        for (const movimiento of registro.movements) {
            console.log(movimiento);
            re.action = 'Movimiento';
            re.type = movimiento.transactionType;
            re.quantity = movimiento.quantity;
            re.agent = registro.agent.name;
            data.push(re);
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
            data.push(re);
            re = {
                action: '',
                type: '',
                observation: '',
                agent: '',
                quantity: '',
            };
        }

    }

    return data;
}
