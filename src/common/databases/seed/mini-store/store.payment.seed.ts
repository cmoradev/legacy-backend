import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class StorePaymentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_tie_payments;`);
        await connection.query(`
        CREATE VIEW vw_tie_payments AS 
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
            CAST((p.cantidad - p.cambio) AS DECIMAL(12,6)) AS p_income,
            a.matricula AS a_key,
            (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)) AS a_fullname,
            v.storeBranchOfficeId AS v_branch_office,
            v.cycleId AS v_cycle,
            p.createdAt AS p_created_at,
            p.timbrado AS p_stamping,
            p.systemPaymentStatusId AS p_state
        FROM tie_venta_pagos p
        
        LEFT JOIN tie_ventas v ON v.id = p.saleId
        LEFT JOIN alumnos a ON a.id = v.id_alumno
        LEFT JOIN tie_facturas f ON p.id = f.miniStoreSalePaymentId
        
        ORDER BY v.id DESC;
        `);
    }
}
