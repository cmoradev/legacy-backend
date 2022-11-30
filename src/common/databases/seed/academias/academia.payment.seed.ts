import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class AcademiaPaymentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_aca_payments;`);
        await connection.query(`
        CREATE VIEW vw_aca_payments AS
        SELECT
        p.id AS p_id,
        f.id AS f_id,
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
        v.observaciones AS v_observations,
        CAST((p.quantity - p.change) AS DECIMAL(12,6)) AS p_income,
        (SELECT SUM(CAST((acp.quantity - acp.change) AS DECIMAL(12,6))) from ac_charge_payments acp where acp.academyChargeId = p.academyChargeId and id not in (p.id)) AS p_total_without_current,
        a.id_modalidad AS a_tipo,
        a.id AS a_id,
        a.matricula AS a_key,
        (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)) AS a_fullname,
        v.academyBranchOfficeSetId AS v_branch_office,
        bf.id AS bf_branch_office,
        bf.plantel AS bf_branch_office_name,
        v.ciclo AS v_cycle,
        v.id_estado_pago AS v_status,
        p.createdAt AS p_created_at,
        f.createdAt AS f_created_at,
        p.stamping AS p_stamping,
        p.paymentStatusId AS p_state,
        (select p_way_name from vw_aca_way_payments where p_id = p.id LIMIT 1) AS f_metodo_pago,
        (select p_way from vw_aca_way_payments where p_id = p.id LIMIT 1) AS f_metodo_pago_codigo,
        (select p_way_name from vw_aca_way_payments where p_id = v.id LIMIT 1) AS p_metodo_pago,
        (select p_way from vw_aca_way_payments where p_id = v.id LIMIT 1) AS p_metodo_pago_codigo,
        p.globalUuid AS p_global_uuid,
        (CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno)) AS u_fullname_cashier,
        (CONCAT(us.nombre, ' ', us.ap_paterno, ' ', us.ap_materno)) AS us_fullname_cancelation,
        u.id AS cashier_id,
        us.id AS cancelation_id,
        (SELECT GROUP_CONCAT(typeExtraCharge) FROM ac_charges_details_extra_charges where chargeDetailId = vd.id ) as types_charges,
        (SELECT GROUP_CONCAT(quantity) FROM ac_charges_details_extra_charges where chargeDetailId = vd.id ) as quantyties_charges,
        (SELECT GROUP_CONCAT(applicationType) FROM ac_charges_details_extra_charges where chargeDetailId = vd.id ) as aplications_charges,
        vd.cantidad AS vd_quantity,
        vd.precio AS vd_price,
        vd.precio AS vd_price_IVA,
        vd.id AS vd_id
    FROM ac_charge_payments p

    LEFT JOIN ac_cobros v ON v.id = p.academyChargeId
    LEFT JOIN ac_cobro_detalle vd ON vd.id_ac_cobro = v.id
    LEFT JOIN alumnos a ON a.id = v.id_alumno
    LEFT JOIN ac_facturas f ON p.id = f.academyChargePaymentId
    LEFT JOIN usuarios u ON u.id = v.id_agente
    LEFT JOIN usuarios us ON us.id = v.id_agente_cancelacion
    LEFT JOIN usuarios fu ON u.id = f.id_agente_facturador
    LEFT JOIN planteles bf ON bf.id = p.academyPaymentOfficeId

    ORDER BY v.id DESC;
        `);
    }
}
