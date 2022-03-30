import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class SchoolWayPaymentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_sch_way_payments;`);
        await connection.query(`
        CREATE VIEW vw_sch_way_payments AS
        SELECT 
            p.id AS p_id,
            p.folio AS p_folio,
            (p.quantity - p.change) AS p_ingreso,
            fp.codePaymentMethod AS p_way
        FROM school_charge_payments p
        
        INNER JOIN school_charges_methods_payments fp ON fp.schoolChargePaymentId = p.id
        
        ORDER BY p.id DESC;
        `);

    }
}
