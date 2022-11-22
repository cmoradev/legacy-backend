import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class SaleSchoolViewSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_sch_sales`);
        await connection.query(`
        CREATE VIEW vw_sch_sales AS
        SELECT
            scd.id AS vd_id,
            v.id AS v_id,
            v.folio AS v_folio,
            v.status AS v_status,
            scd.createdAt AS vd_created_at,
            a.id AS a_id,
            a.id_modalidad AS a_tipo,
            a.matricula AS a_key,
            (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)) AS a_fullname,
            bf.id AS v_id_branch_office,
            bf.plantel AS v_branch_office,
            v.schoolCycleId AS v_cycle,
            scd.concept AS vd_product_name,
            scd.quantity AS vd_quantity,
            scd.price AS vd_price,
            scd.price AS vd_price_IVA,
            (scd.price * scd.quantity) AS totalIVA,
            (scd.price * scd.quantity) AS total,
            (CONCAT(vu.nombre, ' ', vu.ap_paterno, ' ', vu.ap_materno)) AS vu_fullname_cashier,
            vu.id AS cashier_id_venta,
            (CONCAT(vuc.nombre, ' ', vuc.ap_paterno, ' ', vuc.ap_materno)) AS vuc_fullname_cancelation,
            vuc.id AS cancelation_id_venta,
            v.observations AS v_observations,
            (SELECT GROUP_CONCAT(typeExtraCharge) FROM school_charges_details_extra_charges where chargeDetailId = scd.id ) as types_charges,
            (SELECT GROUP_CONCAT(quantity) FROM school_charges_details_extra_charges where chargeDetailId = scd.id ) as quantyties_charges,
            (SELECT GROUP_CONCAT(applicationType) FROM school_charges_details_extra_charges where chargeDetailId = scd.id ) as aplications_charges

FROM school_charges_details scd

LEFT JOIN school_charges v ON v.id = scd.schoolChargeId
LEFT JOIN usuarios vu ON vu.id = v.cashierId
LEFT JOIN usuarios vuc ON vuc.id = v.cashierCancellationId
LEFT JOIN alumnos a ON a.id = v.schoolStudentId
LEFT JOIN planteles bf on bf.id = v.schoolCampusId
ORDER BY v.id DESC;
        `)
    }
}
