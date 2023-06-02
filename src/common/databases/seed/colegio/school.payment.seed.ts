import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class SchoolPaymentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_sch_payments;`);
        await connection.query(`
        CREATE VIEW vw_sch_payments AS 
        SELECT
            p.id AS p_id,
            f.id AS f_id,
            v.id AS v_id,
            CASE 
				WHEN f.folio IS NOT NULL THEN f.folio
				WHEN p.globalUuid IS NOT NULL THEN 'Folio global'
            ELSE 'N/A' END AS f_folio,
            CASE 
				WHEN f.status IS NOT NULL THEN f.status
                WHEN p.globalUuid IS NOT NULL THEN 'Estatus global'
			ELSE 'N/A' END AS f_status,
            bf.id AS bf_id_branch_office,
            bf.plantel AS bf_name_branch_office,
            v.folio AS v_folio,
            p.folio AS p_folio,
            f.uuid AS f_uuid,
            f.rfc AS f_rfc,
            f.invoiceType AS f_type,
            p.quantity AS p_quantity,
            p.change AS p_change,
            v.observations AS v_observations,
            CAST((p.quantity - p.change) AS DECIMAL(12,6)) AS p_income,
			a.id AS a_id,
            a.id_modalidad AS a_type,
            a.matricula AS a_key,
            (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)) AS a_fullname,
            p.schoolPaymentOfficeId AS v_branch_office,
            v.schoolCycleId AS v_cycle,
            v.status AS v_status,
            p.createdAt AS p_created_at,
            CASE
				WHEN f.createdAt IS NOT NULL THEN f.createdAt
                WHEN f.createdAt IS NULL THEN p.createdAt
			END AS f_created_at,
            p.stamping AS p_stamping,
            p.paymentStatusId AS p_state,
            (select p_way_name from vw_my_sch_way_payments where p_id = p.id LIMIT 1) AS f_metodo_pago,
            (select p_way from vw_my_sch_way_payments where p_id = p.id LIMIT 1) AS f_metodo_pago_codigo,
            p.globalUuid AS p_global_uuid,
            (CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno)) AS u_fullname_cashier,
            (CONCAT(us.nombre, ' ', us.ap_paterno, ' ', us.ap_materno)) AS us_fullname_cancelation,
            (CONCAT(pu.nombre, ' ', pu.ap_paterno, ' ', pu.ap_materno)) AS p_fullname_cashier,
            (CONCAT(puc.nombre, ' ', puc.ap_paterno, ' ', puc.ap_materno)) AS p_fullname_cancelation,
            u.id AS cashier_id,
            us.id AS cancelation_id,
            pu.id AS p_cashier_id,
            puc.id AS p_cancelation_id,
            (select p_way from vw_sch_way_payments where p_id = p.id Limit 1) AS p_metodo_pago_codigo,
			(select p_way_name from vw_sch_way_payments where p_id = p.id Limit 1) AS p_metodo_pago,
       (SELECT GROUP_CONCAT(CONCAT(chargeDetailId, ';', typeExtraCharge, ';', quantity, ';', applicationType))
        FROM school_charges_details_extra_charges
        where chargeDetailId IN
              (SELECT id FROM school_charges_details where schoolChargeId = v.id)) AS extras,
       (SELECT SUM(CAST((temps.quantity - temps.change) AS DECIMAL(12, 6)))
        from school_charge_payments temps
        where temps.schoolChargeId = v.id
          and temps.id not in (p.id)
          and temps.paymentStatusId in (2,3)) AS p_total_without_current,
       (SELECT GROUP_CONCAT(CONCAT(id,';',quantity,';',price)) FROM school_charges_details where schoolChargeId = v.id) AS details,
       (SELECT SUM(CAST((quantity * price) AS DECIMAL(12, 6)))
        FROM school_charges_details
        where schoolChargeId = v.id) AS total_details_without_extra
        FROM school_charge_payments p
        LEFT JOIN school_charges v ON v.id = p.schoolChargeId
        LEFT JOIN alumnos a ON a.id = v.schoolStudentId
        LEFT JOIN usuarios u ON u.id = v.cashierId
        LEFT JOIN usuarios us ON us.id = v.cashierCancellationId
        LEFT JOIN school_charges_invoice f ON p.id = f.schoolChargePaymentId
        LEFT JOIN planteles bf on bf.id = p.schoolPaymentOfficeId
        LEFT JOIN usuarios pu ON pu.id = p.cashierChargeId
        LEFT JOIN usuarios puc ON puc.id = p.cashierChargeCancellationId
        ORDER BY v.id DESC;
        `);
    }
}
