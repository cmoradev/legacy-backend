import { CashRegister } from '../entities/cash-register.entity';
import { SubNumber } from '../../../common/numbers';
import { CashRegisterTransactionType } from '../../cash-register-transactions/enums/cash-register-transaction-type.enum';
import { roundQuantity, subQuantity, sumQuantity } from '../../../common/point-of-sale/point-of-sale';

interface TransactionsData {
    action: '',
    type: string;
    observation: string;
    agent: string;
    quantity: string;
}

interface Convert {
    data: TransactionsData[]
    box: string | number | any;
    income: string | number | any;
    moneyOut: string | number | any;
    subIncomeMoneyOut: string | number | any;
    total: string | number | any;
    finalAmount: number | string;
}

export function transactionsList(registro: CashRegister): Convert {

    const resultado = {
        data: [],
        box: roundQuantity(registro.initialAmount),
        income: 0,
        finalAmount: roundQuantity(registro.finalAmount),
        moneyOut: 0,
        subIncomeMoneyOut: 0,
        total: 0,

    };

    let re: any = {
        action: '',
        type: '',
        observation: '',
        agent: '',
        quantity: '',
    };
    for (const movimiento of registro.movements) {
        resultado.moneyOut = sumQuantity(resultado.moneyOut, movimiento.quantity);
        re.action = 'Movimiento';
        re.type = typeTrasaction(movimiento.transactionType);
        re.observation = movimiento.description;
        re.quantity = roundQuantity(movimiento.quantity);
        re.agent = registro.agent.name;
        resultado.data.push(re);
        re = {
            action: '',
            type: '',
            observation: '',
            agent: '',
            quantity: '',
        };
    }
    for (const transaccion of registro.transactions) {
        const total = SubNumber(transaccion.payment.quantity, transaccion.payment.change);
        // @ts-ignore
        resultado.income = sumQuantity(resultado.income, total).toString();
        re.action = 'Transacción';
        re.type = typeTrasaction(transaccion.transactionType);
        re.quantity = total;
        re.observation = transaccion.payment.observations;
        re.agent = transaccion.agent.name;
        resultado.data.push(re);
        re = {
            action: '',
            type: '',
            observation: '',
            agent: '',
            quantity: '',
        };
    }
    resultado.subIncomeMoneyOut = subQuantity(resultado.income, resultado.moneyOut);
    resultado.total = subQuantity(resultado.income, resultado.moneyOut);

    return resultado;
}

function typeTrasaction(type: string) {
    let text = '';
    switch (type) {
        case CashRegisterTransactionType.expenses:
            text = 'Gastos';
            break;
        case CashRegisterTransactionType.income:
            text = 'Ingresos';
            break;
        case CashRegisterTransactionType.moneyOut:
            text = 'Retiro';
            break;
    }

    return text;
}
