import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class BeforeInsertAcChargeTriggerSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const queryRunner = connection;
        await queryRunner.query(`DROP TRIGGER IF EXISTS before_cobro_insert`);
        await queryRunner.query(`
        CREATE TRIGGER before_cobro_insert 
            BEFORE INSERT ON ac_cobros
            FOR EACH ROW BEGIN 
                SET @prefix = (SELECT foliaje_nota FROM facturacion_empresas WHERE id= NEW.academyBranchOfficeSetId AND active = true); 
                SET @consecutive = (SELECT serie_nota FROM facturacion_empresas WHERE id= NEW.academyBranchOfficeSetId AND active = true); 
                SET @consecutive = (SELECT @consecutive + 1); SET @folio = (CONCAT_WS('-', @prefix, @consecutive)); 
                SET NEW.folio = @folio; UPDATE facturacion_empresas SET serie_nota = @consecutive WHERE id= NEW.academyBranchOfficeSetId AND active = true;
            END`);

    }
}
