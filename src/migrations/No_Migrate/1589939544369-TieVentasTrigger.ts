import { MigrationInterface, QueryRunner } from 'typeorm';

export class TieVentasTrigger1589939544369 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
        CREATE TRIGGER before_venta_insert 
            BEFORE INSERT ON tie_ventas
            FOR EACH ROW  
            BEGIN 
                SET @prefix = (SELECT foliaje_nota FROM facturacion_empresas WHERE id= NEW.storeBranchOfficeSetId AND active = true); 
                SET @consecutive = (SELECT serie_nota FROM facturacion_empresas WHERE id= NEW.storeBranchOfficeSetId AND active = true); 
                SET @consecutive = (SELECT @consecutive + 1); SET @folio = (CONCAT_WS('-', @prefix, @consecutive)); 
                SET NEW.folio = @folio; UPDATE facturacion_empresas SET serie_nota = @consecutive WHERE id= NEW.storeBranchOfficeSetId AND active = true;
                
            END`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS before_venta_insert`);
    }

}
