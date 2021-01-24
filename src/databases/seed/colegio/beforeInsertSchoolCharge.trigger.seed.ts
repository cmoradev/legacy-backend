import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class BeforeInsertSchoolChargeTriggerSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const queryRunner = connection;
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
}
