import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class SaleAcademiaViewSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_aca_sales`);
        await connection.query(`
        CREATE VIEW vw_aca_sales AS
        SELECT v.id                                                                      AS v_id,
       v.folio                                                                   AS v_folio,
       v.id_estado_pago                                                          AS v_status,
       v.createdAt                                                               AS v_created_at,
       a.id                                                                      AS a_id,
       a.id_modalidad                                                            AS a_type,
       a.matricula                                                               AS a_key,
       (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno))                  AS a_fullname,
       v.ciclo                                                                 AS v_cycle,
       v.id_plantel                                                     AS v_branch_office,
       v.observaciones                                                           AS v_observations,
       (CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno))                  AS u_fullname_cashier,
       (CONCAT(us.nombre, ' ', us.ap_paterno, ' ', us.ap_materno))               AS us_fullname_cancelation,
       (SELECT GROUP_CONCAT(CONCAT(chargeDetailId, ';', typeExtraCharge, ';', quantity, ';', applicationType))
        FROM ac_charges_details_extra_charges
        where chargeDetailId IN
              (SELECT id FROM ac_cobro_detalle where id_ac_cobro = v.id))                AS extras,
       (SELECT SUM(CAST((tempa.quantity - tempa.change) AS DECIMAL(12, 6)))
        from ac_charge_payments tempa
        where academyChargeId = v.id
          and paymentStatusId in (2,3))                                                               AS p_total_without_current,
       (SELECT GROUP_CONCAT(CONCAT(id,';',cantidad,';',precio)) FROM ac_cobro_detalle where id_ac_cobro = v.id) AS details,
       (SELECT GROUP_CONCAT(CONCAT(id, ';', concepto))
        FROM ac_cobro_detalle
        where id_ac_cobro = v.id)                                          AS details_names,
       (SELECT SUM(CAST((cantidad * precio) AS DECIMAL(12, 6)))
        FROM ac_cobro_detalle
        where id_ac_cobro = v.id)                                                         AS total_details_without_extra

        FROM ac_cobros v

         LEFT JOIN usuarios u ON u.id = v.id_agente
         LEFT JOIN usuarios us ON us.id = v.id_agente_cancelacion
         LEFT JOIN alumnos a ON a.id = v.id_alumno
        ORDER BY v.id DESC;
        `)
    }
}
