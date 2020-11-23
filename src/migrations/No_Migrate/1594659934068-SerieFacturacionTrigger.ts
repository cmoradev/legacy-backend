import { MigrationInterface, QueryRunner } from 'typeorm';

export class SerieFacturacionTrigger1594659934068 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS before_factura_insert`);
        await queryRunner.query(`
        CREATE TRIGGER before_factura_insert 
    BEFORE INSERT ON tie_facturas
      FOR EACH ROW  
      BEGIN 
        SET @prefix = (SELECT foliaje_factura FROM facturacion_empresas WHERE id= NEW.invoiceBranchOfficeSetId AND active = true); 
         SET @consecutive = (SELECT serie_factura FROM facturacion_empresas WHERE id= NEW.invoiceBranchOfficeSetId AND active = true); 
         SET @consecutive = (SELECT @consecutive + 1); 
         SET @folio = (CONCAT_WS('-', @prefix, @consecutive));
         SET NEW.folio = @folio;  
         UPDATE facturacion_empresas SET serie_factura = @consecutive WHERE id= NEW.invoiceBranchOfficeSetId AND active = true;           
       END
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS before_factura_insert`);
    }

}
