import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class BeforeInsertPedidosTriggerSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const queryRunner = connection;
        await queryRunner.query(`DROP TRIGGER IF EXISTS tie_almacen_pedidos_insert`);
        await queryRunner.query(`
        CREATE TRIGGER tie_almacen_pedidos_insert 
            BEFORE INSERT ON tie_almacen_pedidos
            FOR EACH ROW  
            BEGIN 
                SET @prefix = (SELECT prefix_order FROM planteles WHERE id = NEW.branchOfficeMiniStoreWherehouseId); 
                SET @consecutive = (SELECT folio_order FROM planteles WHERE id= NEW.branchOfficeMiniStoreWherehouseId); 
                SET @consecutive = (SELECT @consecutive + 1); SET @folio = (CONCAT_WS('-', @prefix, @consecutive)); 
                SET NEW.folio = @folio; 
                UPDATE planteles SET folio_order = @consecutive WHERE id = NEW.branchOfficeMiniStoreWherehouseId;
            END
        `);

    }
}
