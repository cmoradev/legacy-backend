import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class StorePaymentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_tie_payments;`);
        await connection.query(`
        CREATE VIEW vw_tie_payments AS
        SELECT p.*,
       (select p_way from vw_tie_way_payments where p_id = p.p_id Limit 1)                      AS p_metodo_pago_codigo,
       (select p_way_name from vw_tie_way_payments where p_id = p.p_id Limit 1)                 AS p_metodo_pago,
       (SELECT GROUP_CONCAT(CONCAT(miniSaleChargeDetailsId, ';', typeExtraCharge, ';', quantity, ';', applicationType))
        FROM mini_store_details_extra_charges
        where miniSaleChargeDetailsId IN
              (SELECT id FROM tie_venta_detalle where miniStoreSaleId = p.v_id))                AS extras,
       (SELECT SUM(CAST((cantidad - cambio) AS DECIMAL(12, 6)))
        from tie_venta_pagos
        where saleId = p.v_id
          and id not in (p.p_id)
          and systemPaymentStatusId in (2,3))                                                               AS p_total_without_current,
       (SELECT GROUP_CONCAT(CONCAT(id,';',cantidad,';',priceWithIVA)) FROM tie_venta_detalle where miniStoreSaleId = p.v_id) AS details,
       (SELECT SUM(CAST((cantidad * priceWithIVA) AS DECIMAL(12, 6)))
        FROM tie_venta_detalle
        where miniStoreSaleId = p.v_id)                                                         AS total_details_without_extra
FROM vw_my_tie_payments p
        ORDER BY p.p_id DESC
        `);
    }
}
