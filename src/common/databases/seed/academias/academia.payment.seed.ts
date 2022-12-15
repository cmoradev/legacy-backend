import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class AcademiaPaymentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_aca_payments;`);
        await connection.query(`
        CREATE VIEW vw_aca_payments AS
        SELECT p.*,
       (select p_way from vw_tie_way_payments where p_id = p.p_id Limit 1)                      AS p_metodo_pago_codigo,
       (select p_way_name from vw_tie_way_payments where p_id = p.p_id Limit 1)                 AS p_metodo_pago,
       (SELECT GROUP_CONCAT(CONCAT(chargeDetailId, ';', typeExtraCharge, ';', quantity, ';', applicationType))
        FROM ac_charges_details_extra_charges
        where chargeDetailId IN
              (SELECT id FROM ac_cobro_detalle where id_ac_cobro = p.v_id))                AS extras,
       (SELECT SUM(CAST((tempa.quantity - tempa.change) AS DECIMAL(12, 6)))
        from ac_charge_payments tempa
        where academyChargeId = p.v_id
          and id not in (p.p_id)
          and paymentStatusId in (2,3))                                                               AS p_total_without_current,
       (SELECT GROUP_CONCAT(CONCAT(id,';',cantidad,';',precio)) FROM ac_cobro_detalle where id_ac_cobro = p.v_id) AS details,
       (SELECT SUM(CAST((cantidad * precio) AS DECIMAL(12, 6)))
        FROM ac_cobro_detalle
        where id_ac_cobro = p.v_id)                                                         AS total_details_without_extra
        FROM vw_my_aca_payments p
        ORDER BY p.p_id DESC;
        `);
    }
}
