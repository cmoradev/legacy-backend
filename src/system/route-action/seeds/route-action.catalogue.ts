import { RouteAction } from '../entities/route-action.entity';
import { ActionsEnum } from '../../actions/seeds/actions.catalogue';

// @ts-ignore
const routesActions: Partial<RouteAction>[] = [
    { id: 1, route: { id: 21 }, action: { id: ActionsEnum.CREATE } },
    { id: 2, route: { id: 21 }, action: { id: ActionsEnum.READ } },
    { id: 3, route: { id: 21 }, action: { id: ActionsEnum.UPDATE } },
    { id: 4, route: { id: 21 }, action: { id: ActionsEnum.DELETE } },
    { id: 5, route: { id: 21 }, action: { id: ActionsEnum.INGRESOS_POR_FECHA } },
    { id: 6, route: { id: 21 }, action: { id: ActionsEnum.VENTAS_POR_FECHA } },
    { id: 7, route: { id: 21 }, action: { id: ActionsEnum.CLIENTES } },
    { id: 8, route: { id: 21 }, action: { id: ActionsEnum.CAJEROS } },
    { id: 9, route: { id: 21 }, action: { id: ActionsEnum.INGRESOS_POR_MES_DEL_ANO } },
    { id: 10, route: { id: 21 }, action: { id: ActionsEnum.INGRESOS_POR_FORMA_DE_PAGO } },
    { id: 11, route: { id: 21 }, action: { id: ActionsEnum.MOVIMIENTOS } },
    { id: 12, route: { id: 21 }, action: { id: ActionsEnum.VENTAS_POR_CAJERO } },
    { id: 13, route: { id: 21 }, action: { id: ActionsEnum.INFORMACION_DE_PRODUCTOS } },
    { id: 14, route: { id: 21 }, action: { id: ActionsEnum.INSCRITOS_A } },
    { id: 15, route: { id: 21 }, action: { id: ActionsEnum.BAJAS_A } },
    { id: 16, route: { id: 21 }, action: { id: ActionsEnum.NO_INSCRITOS } },
    { id: 17, route: { id: 21 }, action: { id: ActionsEnum.INCLUIDAS } },
    { id: 18, route: { id: 21 }, action: { id: ActionsEnum.RENDIMIENTO_TOTAL_A } },
    { id: 19, route: { id: 21 }, action: { id: ActionsEnum.G_TOTAL_DE_INS_A } },
    { id: 20, route: { id: 21 }, action: { id: ActionsEnum.G_TOTAL_DE_INSGRESOS_A } },
    { id: 21, route: { id: 21 }, action: { id: ActionsEnum.RANGO_DE_FECHA } },
] as RouteAction;
export default routesActions;