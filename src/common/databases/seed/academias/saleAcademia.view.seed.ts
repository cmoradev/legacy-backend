import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class SaleAcademiaViewSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_aca_sales`);
        await connection.query(`
        CREATE VIEW vw_aca_sales AS
        SELECT
            acd.id AS vd_id,
            v.id AS v_id,
            v.folio AS v_folio,
            v.id_estado_pago AS v_status,
            acd.createdAt AS vd_created_at,
            a.id AS a_id,
            a.id_modalidad AS a_tipo,
            a.matricula AS a_key,
            (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)) AS a_fullname,
            v.ciclo AS v_cycle,
            v.academyBranchOfficeSetId AS branch_office,
            bf.id AS v_id_branch_office,
            bf.plantel AS v_branch_office,
            acd.concepto AS vd_product_name,
            acd.cantidad AS vd_quantity,
            acd.precio AS vd_price,
            acd.precio AS vd_price_IVA,
            (acd.cantidad * acd.precio) AS totalIVA,
            (acd.cantidad * acd.precio) AS total,
            (CONCAT(vu.nombre, ' ', vu.ap_paterno, ' ', vu.ap_materno)) AS vu_fullname_cashier,
            vu.id AS cashier_id_venta,
            (CONCAT(vuc.nombre, ' ', vuc.ap_paterno, ' ', vuc.ap_materno)) AS vuc_fullname_cancelation,
            vuc.id AS cancelation_id_venta,
            v.observaciones AS v_observations,
            (SELECT GROUP_CONCAT(typeExtraCharge) FROM ac_charges_details_extra_charges where chargeDetailId = acd.id ) as types_charges,
            (SELECT GROUP_CONCAT(quantity) FROM ac_charges_details_extra_charges where chargeDetailId = acd.id ) as quantyties_charges,
            (SELECT GROUP_CONCAT(applicationType) FROM ac_charges_details_extra_charges where chargeDetailId = acd.id ) as aplications_charges

        FROM ac_cobro_detalle acd

        LEFT JOIN ac_cobros v ON v.id = id_ac_cobro
        LEFT JOIN alumnos a ON a.id = v.id_alumno
        LEFT JOIN usuarios vu ON vu.id = v.id_agente
        LEFT JOIN usuarios vuc ON vuc.id = v.id_agente_cancelacion
        LEFT JOIN planteles bf ON bf.id = v.id_plantel

        ORDER BY v.id DESC;
        `)
    }
}
