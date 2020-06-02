import {MigrationInterface, QueryRunner} from "typeorm";

export class TieVentasTriggerStockReturn1590588072149 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
        CREATE
        TRIGGER tie_venta_after_update AFTER UPDATE 
        ON tie_ventas 
        FOR EACH ROW BEGIN
        
        DECLARE done BOOLEAN DEFAULT FALSE;
        DECLARE _id_producto INTEGER;
        DECLARE _cantidad DECIMAL(15,6);
        DECLARE products_details_cursor CURSOR FOR SELECT miniStoreProductId, cantidad FROM tie_venta_detalle WHERE miniStoreSaleId = NEW.id;
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET done := TRUE; 
        
        IF NEW.id_estado_pago = 4 THEN
        
            OPEN products_details_cursor;
                read_loop: LOOP
                 FETCH products_details_cursor INTO _id_producto, _cantidad;
                 
                 IF done THEN
                    CLOSE products_details_cursor;
                     LEAVE read_loop;
                 END IF;
                 
                 SET @currentStock = (SELECT stock FROM tie_productos WHERE id = _id_producto);
                SET @newStock = (@currentStock + _cantidad);	
                UPDATE tie_productos SET stock = @newStock WHERE id = _id_producto;
    
            END LOOP;
        END IF;			 
    END`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS tie_venta_after_update`);
    }

}
