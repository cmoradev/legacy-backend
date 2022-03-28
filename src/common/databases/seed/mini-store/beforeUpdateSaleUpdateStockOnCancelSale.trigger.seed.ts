import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class BeforeUpdateSaleUpdateStockOnCancelSaleTriggerSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const queryRunner = connection;
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_stock_on_cancel_sale`);
        await queryRunner.query(`
        CREATE TRIGGER update_stock_on_cancel_sale BEFORE UPDATE ON tie_ventas
             FOR EACH ROW BEGIN
             DECLARE done BOOL DEFAULT FALSE;
             DECLARE producto_id INT;
             DECLARE cantidad_venta DECIMAL(15,3);
             
             DECLARE productos_venta
             CURSOR FOR SELECT id_producto, cantidad FROM tie_venta_detalle where miniStoreSaleId= OLD.id;
             DECLARE CONTINUE HANDLER FOR NOT FOUND SET done := TRUE;
             
             OPEN productos_venta;
                 read_loop: LOOP
                   FETCH productos_venta INTO producto_id, cantidad_venta;
                    
                    IF done THEN
                      LEAVE read_loop;
                    END IF;   
                    
                    IF (NEW.id_estado_pago = 4) THEN 
                      SET @current_stock = (SELECT stock FROM tie_productos WHERE id= producto_id LIMIT 1);
                    SET @new_stock = (@current_stock) + (cantidad_venta);
                      UPDATE tie_productos SET stock=@new_stock WHERE id=producto_id;
                    END IF;
                    
                 END LOOP;
             CLOSE productos_venta;
             END`);

    }
}
