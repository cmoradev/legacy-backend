import { RouteActionsAction } from '../entities/routeActionsAction.entity';
import { ActionsEnum } from '../../actions/seeds/actions.catalogue';

// @ts-ignore
const routesActions: Partial<RouteActionsAction>[] = [
    { routeId: 21, actionId: ActionsEnum.CREATE },
    { routeId: 21, actionId: ActionsEnum.READ },
    { routeId: 21, actionId: ActionsEnum.UPDATE },
    { routeId: 21, actionId: ActionsEnum.DELETE },
    { routeId: 21, actionId: ActionsEnum.INGRESOS_POR_FECHA },
    { routeId: 21, actionId: ActionsEnum.INGRESOS_POR_FECHA },
    { routeId: 21, actionId: ActionsEnum.VENTAS_POR_FECHA },
    { routeId: 21, actionId: ActionsEnum.CLIENTES },
    { routeId: 21, actionId: ActionsEnum.CAJEROS },
    { routeId: 21, actionId: ActionsEnum.INGRESOS_POR_MES_DEL_ANO },
    { routeId: 21, actionId: ActionsEnum.INGRESOS_POR_FORMA_DE_PAGO },
    { routeId: 21, actionId: ActionsEnum.MOVIMIENTOS },
    { routeId: 21, actionId: ActionsEnum.VENTAS_POR_CAJERO },
    { routeId: 21, actionId: ActionsEnum.INFORMACION_DE_PRODUCTOS },
    { routeId: 21, actionId: ActionsEnum.INSCRITOS_A },
    { routeId: 21, actionId: ActionsEnum.BAJAS_A },
    { routeId: 21, actionId: ActionsEnum.NO_INSCRITOS },
    { routeId: 21, actionId: ActionsEnum.INCLUIDAS },
    { routeId: 21, actionId: ActionsEnum.G_TOTAL_DE_INS_A },
    { routeId: 21, actionId: ActionsEnum.G_TOTAL_DE_INSGRESOS_A },
];
export default routesActions;