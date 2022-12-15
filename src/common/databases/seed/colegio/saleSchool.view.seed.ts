import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class SaleSchoolViewSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_sch_sales`);
        await connection.query(`
        CREATE VIEW vw_sch_sales AS
        SELECT v.id                                                                      AS v_id,
       v.folio                                                                   AS v_folio,
       v.status                                                          AS v_status,
       v.createdAt                                                               AS v_created_at,
       a.id                                                                      AS a_id,
       a.id_modalidad                                                            AS a_type,
       a.matricula                                                               AS a_key,
       (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno))                  AS a_fullname,
       v.schoolCycleId                                                                 AS v_cycle,
       v.schoolCampusId                                                     AS v_branch_office,
       v.observations                                                           AS v_observations,
       (CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno))                  AS u_fullname_cashier,
       (CONCAT(us.nombre, ' ', us.ap_paterno, ' ', us.ap_materno))               AS us_fullname_cancelation,
       (SELECT GROUP_CONCAT(CONCAT(chargeDetailId, ';', typeExtraCharge, ';', quantity, ';', applicationType))
        FROM school_charges_details_extra_charges
        where chargeDetailId IN
              (SELECT id FROM school_charges_details where schoolChargeId = v.id)) AS extras,
       (SELECT SUM(CAST((temps.quantity - temps.change) AS DECIMAL(12, 6)))
        from school_charge_payments temps
        where temps.schoolChargeId = v.id
          and temps.paymentStatusId in (2,3))                                                               AS p_total_without_current,
       (SELECT GROUP_CONCAT(CONCAT(id,';',quantity,';',price)) FROM school_charges_details where schoolChargeId = v.id) AS details,
       (SELECT GROUP_CONCAT(CONCAT(id, ';', concept))
        FROM school_charges_details
        where schoolChargeId = v.id)                                          AS details_names,
       (SELECT SUM(CAST((quantity * price) AS DECIMAL(12, 6)))
        FROM school_charges_details
        where schoolChargeId = v.id)                                                         AS total_details_without_extra

FROM school_charges v

         LEFT JOIN usuarios u ON u.id = v.cashierId
         LEFT JOIN usuarios us ON us.id = v.cashierCancellationId
         LEFT JOIN alumnos a ON a.id = v.schoolStudentId
ORDER BY v.id DESC;
        `)
    }
}
