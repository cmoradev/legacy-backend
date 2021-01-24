import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class AfterInsertSaleDetailsMinTriggerSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const queryRunner = connection;
        await queryRunner.query(`DROP TRIGGER IF EXISTS tie_venta_detalle_after_insert`);
        await queryRunner.query(`
        CREATE TRIGGER tie_venta_detalle_after_insert AFTER INSERT 
        ON tie_venta_detalle 
        FOR EACH ROW BEGIN
            SET @currentStock = (SELECT stock FROM tie_productos WHERE id = NEW.id_producto);
            SET @newStock = (@currentStock - NEW.cantidad);
            
            UPDATE tie_productos SET stock = @newStock WHERE id = NEW.id_producto;    
        END
        `);

    }
}
