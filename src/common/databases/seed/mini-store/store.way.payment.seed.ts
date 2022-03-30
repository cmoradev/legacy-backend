import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class StorePaymentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_tie_way_payments;`);
        await connection.query(`
        CREATE VIEW vw_tie_way_payments AS
        SELECT 
            p.id AS p_id,
            p.folio AS p_folio,
            (p.cantidad - p.cambio) AS p_ingreso,
            fp.codigo_forma_pago AS p_way
        FROM tie_venta_pagos p
        
        INNER JOIN tie_venta_forma_pago fp ON fp.salePaymentId = p.id
        
        ORDER BY p.id DESC;
        `);
    }
}
