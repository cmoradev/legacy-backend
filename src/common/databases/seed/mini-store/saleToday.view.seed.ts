import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class SaleTodayViewSeeds implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const queryRunner = connection;
        await queryRunner.query(`DROP VIEW IF EXISTS vw_tie_sale_today`);
        await queryRunner.query(`
        CREATE VIEW vw_tie_sale_today AS 
        SELECT 
            v.id,
            v.folio,
            v.createdAt,
            v.id_estado_pago,
            v.observaciones,
            a.id AS studentId,
            a.matricula AS studentRegistration,
            CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno) AS studentName,
            u.id as agentId,
            CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno) AS AgentName,
            p.id as branchOfficeId,
            p.plantel,
            c.id as cycleId,
            c.ciclo,
            (SELECT COUNT(*) FROM tie_venta_pagos where saleId = v.id and id_estado_pago = 2) as cantidadPagos,
            (SELECT GROUP_CONCAT(id) FROM tie_venta_pagos where saleId = v.id and id_estado_pago = 2) as idsPagos,
            CASE WHEN (SELECT SUM(cantidad)-SUM(cambio) FROM tie_venta_pagos where saleId = v.id and id_estado_pago = 2) IS NULL THEN 0.000 ELSE (SELECT SUM(cantidad)-SUM(cambio) FROM tie_venta_pagos where saleId = v.id and id_estado_pago = 2) END as TotalPagos,
            (SELECT SUM((priceWithIVA*cantidad)) FROM tie_venta_detalle where miniStoreSaleId = v.id) as TotalDetalles,
            (SELECT GROUP_CONCAT(id) FROM tie_venta_detalle where miniStoreSaleId = v.id ) as idsDetalles,
            ((SELECT SUM((priceWithIVA*cantidad)) FROM tie_venta_detalle where miniStoreSaleId = v.id) - (CASE WHEN (SELECT SUM(cantidad)-SUM(cambio) FROM tie_venta_pagos where saleId = v.id and id_estado_pago = 2) IS NULL THEN 0.000 ELSE (SELECT SUM(cantidad)-SUM(cambio) FROM tie_venta_pagos where saleId = v.id and id_estado_pago = 2) END)) as TotalAdeudo
        FROM tie_ventas v
        LEFT JOIN alumnos a ON a.id = v.id_alumno
        LEFT JOIN usuarios u ON u.id = v.id_agente
        LEFT JOIN planteles p ON p.id = v.storeBranchOfficeId
        LEFT JOIN ciclos c on c.id = v.cycleId
        ORDER BY a.id DESC`);

    }
}
