import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTriggerFoliajeNotaSchoolCharges1609179928286 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS before_school_charges_insert`);
        await queryRunner.query(`
        CREATE TRIGGER before_school_charges_insert
            BEFORE INSERT ON school_charges
            FOR EACH ROW  
            BEGIN 
                SET @prefix = (SELECT foliaje_nota FROM facturacion_empresas WHERE id = NEW.schoolBranchOfficeSetId AND active = true); 
                SET @consecutive = (SELECT serie_pago FROM facturacion_empresas WHERE id = NEW.schoolBranchOfficeSetId AND active = true); 
                SET @consecutive = (SELECT @consecutive + 1);
                SET @folio = (CONCAT_WS('-', @prefix, @consecutive)); 
                SET NEW.folio = @folio; UPDATE facturacion_empresas SET serie_nota = @consecutive WHERE id = NEW.schoolBranchOfficeSetId AND active = true;
            END`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
