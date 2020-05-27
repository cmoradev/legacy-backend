import {MigrationInterface, QueryRunner} from "typeorm";

export class TieVentasDetalleTriggerStockMinus1590588028595 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
        CREATE
        TRIGGER tie_venta_detalle_after_insert AFTER INSERT 
        ON tie_venta_detalle 
        FOR EACH ROW BEGIN
        
            SET @currentStock = (SELECT stock FROM tie_productos WHERE id = NEW.id_producto);
            SET @newStock = (currentStock - NEW.cantidad);
            
            UPDATE tie_productos SET stock = @newStock WHERE id = NEW.id_producto;    
        END
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS tie_venta_detalle_after_insert`);
    }

}
