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
            bf.id AS bf_id_branch_office,
            bf.plantel AS bf_name_branch_office,
            v.id AS v_id,
            v.folio AS v_folio,
            p.folio AS p_folio,
            f.folio AS f_folio,
            f.uuid AS f_uuid,
            f.rfc AS f_rfc,
            f.invoiceType AS f_type,
            f.status AS f_status,
            (CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno)) AS fu_fullname_cashier,
            p.quantity AS p_quantity,
            p.change AS p_change,
            v.observations AS v_observations,
            CAST((p.quantity - p.change) AS DECIMAL(12,6)) AS p_income,
            (SELECT SUM(CAST((acp.quantity - acp.change) AS DECIMAL(12,6))) from school_charge_payments acp where acp.schoolChargeId = p.schoolChargeId and id not in (p.id)) AS p_total_without_current,
            a.id_modalidad AS a_tipo,
            a.id AS a_id,
            a.matricula AS a_key,
            (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)) AS a_fullname,
            v.schoolBranchOfficeSetId AS v_branch_office,
            v.schoolCycleId AS v_cycle,
            v.status AS v_status,
            p.createdAt AS p_created_at,
            f.createdAt AS f_created_at,
            p.stamping AS p_stamping,
            p.paymentStatusId AS p_state,
            (select p_way_name from vw_sch_way_payments where p_id = p.id LIMIT 1) AS f_metodo_pago,
            (select p_way from vw_sch_way_payments where p_id = p.id LIMIT 1) AS f_metodo_pago_codigo,
            p.globalUuid AS p_global_uuid,
            (CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno)) AS u_fullname_cashier,
            (CONCAT(us.nombre, ' ', us.ap_paterno, ' ', us.ap_materno)) AS us_fullname_cancelation,
            u.id AS cashier_id,
            us.id AS cancelation_id,
            (CONCAT(uf.nombre, ' ', uf.ap_paterno, ' ', uf.ap_materno)) AS uf_fullname_cashier,
            (CONCAT(usf.nombre, ' ', usf.ap_paterno, ' ', usf.ap_materno)) AS usf_fullname_cancelation,
            uf.id AS f_cashier_id,
            usf.id AS f_cancelation_id,
            (SELECT GROUP_CONCAT(typeExtraCharge) FROM school_charges_details_extra_charges where chargeDetailId = vd.id ) as types_charges,
            (SELECT GROUP_CONCAT(quantity) FROM school_charges_details_extra_charges where chargeDetailId = vd.id ) as quantyties_charges,
            (SELECT GROUP_CONCAT(applicationType) FROM school_charges_details_extra_charges where chargeDetailId = vd.id ) as aplications_charges,
            vd.quantity AS vd_quantity,
            vd.price AS vd_price,
            vd.price AS vd_price_IVA,
            vd.id AS vd_id

        FROM school_charge_payments p
        LEFT JOIN school_charges v ON v.id = p.schoolChargeId
        LEFT JOIN school_charges_details vd ON vd.schoolChargeId = v.id
        LEFT JOIN alumnos a ON a.id = v.schoolStudentId
        LEFT JOIN usuarios u ON u.id = v.cashierId
        LEFT JOIN usuarios us ON us.id = v.cashierCancellationId
        LEFT JOIN school_charges_invoice f ON p.id = f.schoolChargePaymentId
        LEFT JOIN usuarios fu ON u.id = f.id_agente_facturador
        LEFT JOIN usuarios uf ON uf.id = f.id_agente_facturador
        LEFT JOIN usuarios usf ON usf.id = f.id_agente_cancelador
        LEFT JOIN planteles bf on bf.id = p.schoolPaymentOfficeId

        ORDER BY v.id DESC;
        `);
    }
}
