import {MigrationInterface, QueryRunner} from "typeorm";

export class TieProductOrderFolio1593031203276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
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
            END`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS tie_almacen_pedidos_insert`);
    }

}
