import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class BeforeInsertSaleTriggerSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const queryRunner = connection;
        await queryRunner.query(`DROP TRIGGER IF EXISTS before_venta_insert`);
        await queryRunner.query(`
        CREATE TRIGGER before_venta_insert 
            BEFORE INSERT ON tie_ventas
            FOR EACH ROW  
            BEGIN 
         IF NEW.id_estado_pago = 6 THEN
            SET @prefix = (SELECT folio_cotizacion FROM facturacion_empresas WHERE id= NEW.storeBranchOfficeSetId AND active = true); 
                    SET @consecutive = (SELECT serie_cotizacion FROM facturacion_empresas WHERE id= NEW.storeBranchOfficeSetId AND active = true); 
                    SET @consecutive = (SELECT @consecutive + 1); SET @folio = (CONCAT_WS('-', @prefix, @consecutive)); 
                    SET NEW.folio = @folio; 
                    UPDATE facturacion_empresas SET serie_cotizacion = @consecutive WHERE id= NEW.storeBranchOfficeSetId AND active = true;
         ELSE
             SET @prefix = (SELECT foliaje_nota FROM facturacion_empresas WHERE id= NEW.storeBranchOfficeSetId AND active = true); 
                    SET @consecutive = (SELECT serie_nota FROM facturacion_empresas WHERE id= NEW.storeBranchOfficeSetId AND active = true); 
                    SET @consecutive = (SELECT @consecutive + 1); SET @folio = (CONCAT_WS('-', @prefix, @consecutive)); 
                    SET NEW.folio = @folio; UPDATE facturacion_empresas SET serie_nota = @consecutive WHERE id= NEW.storeBranchOfficeSetId AND active = true;
        END IF;             
        END`);

    }
}
