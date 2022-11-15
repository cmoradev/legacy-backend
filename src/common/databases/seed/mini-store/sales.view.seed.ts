import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class SalesViewSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_tie_sales;`);
        await connection.query(`
        CREATE VIEW vw_tie_sales AS
        SELECT
            vd.id AS vd_id,
            v.id AS v_id,
            v.folio AS v_folio,
            v.id_estado_pago AS v_status,
            vd.createdAt AS vd_created_at,
            a.id AS a_id,
            a.id_modalidad AS a_tipo,
            a.matricula AS a_key,
            (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)) AS a_fullname,
            v.cycleId AS v_cycle,
            v.storeBranchOfficeId AS v_branch_office,
            vd.product_name AS vd_product_name,
            vd.cantidad AS vd_quantity,
            vd.precio AS vd_price,
            vd.priceWithIVA AS vd_price_IVA,
            (vd.priceWithIVA* vd.cantidad) AS totalIVA,
            (vd.precio * vd.cantidad) AS total,
            vd.isIva AS vd_is_IVA,
            (CONCAT(vu.nombre, ' ', vu.ap_paterno, ' ', vu.ap_materno)) AS vu_fullname_cashier,
            vu.id AS cashier_id_venta,
            (CONCAT(vuc.nombre, ' ', vuc.ap_paterno, ' ', vuc.ap_materno)) AS vuc_fullname_cancelation,
            vuc.id AS cancelation_id_venta,
            v.observaciones AS v_observations

        FROM tie_venta_detalle vd

        LEFT JOIN tie_ventas v ON v.id = vd.miniStoreSaleId
        LEFT JOIN usuarios vu ON vu.id = v.id_agente
        LEFT JOIN usuarios vuc ON vuc.id = v.agentCancelingId
        LEFT JOIN alumnos a ON a.id = v.id_alumno
        ORDER BY v.id DESC;
        `)
    }
}
