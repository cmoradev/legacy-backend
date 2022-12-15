import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class SchoolPaymentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_sch_payments;`);
        await connection.query(`
        CREATE VIEW vw_sch_payments AS 
        SELECT p.*,
       (select p_way from vw_sch_way_payments where p_id = p.p_id Limit 1)                      AS p_metodo_pago_codigo,
       (select p_way_name from vw_sch_way_payments where p_id = p.p_id Limit 1)                 AS p_metodo_pago,
       (SELECT GROUP_CONCAT(CONCAT(chargeDetailId, ';', typeExtraCharge, ';', quantity, ';', applicationType))
        FROM school_charges_details_extra_charges
        where chargeDetailId IN
              (SELECT id FROM school_charges_details where schoolChargeId = p.v_id))                AS extras,
       (SELECT SUM(CAST((temps.quantity - temps.change) AS DECIMAL(12, 6)))
        from school_charge_payments temps
        where temps.schoolChargeId = p.v_id
          and temps.id not in (p.p_id)
          and temps.paymentStatusId in (2,3))                                                               AS p_total_without_current,
       (SELECT GROUP_CONCAT(CONCAT(id,';',quantity,';',price)) FROM school_charges_details where schoolChargeId = p.v_id) AS details,
       (SELECT SUM(CAST((quantity * price) AS DECIMAL(12, 6)))
        FROM school_charges_details
        where schoolChargeId = p.v_id)                                                         AS total_details_without_extra
        FROM  vw_my_sch_payments p
        ORDER BY p.p_id DESC;
        `);
    }
}
