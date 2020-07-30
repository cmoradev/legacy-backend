import {MigrationInterface, QueryRunner} from "typeorm";

export class AcChargeFolio1596128406369 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
        CREATE TRIGGER before_ac_charge_payment_insert
            BEFORE INSERT ON ac_charge_payments
            FOR EACH ROW  
            BEGIN 
                SET @prefix = (SELECT foliaje_pago FROM facturacion_empresas WHERE id = NEW.academyPaymentOfficeSetId AND active = true); 
                SET @consecutive = (SELECT serie_pago FROM facturacion_empresas WHERE id = NEW.academyPaymentOfficeSetId AND active = true); 
                SET @consecutive = (SELECT @consecutive + 1); 
                SET @folio = (CONCAT_WS('-', @prefix, @consecutive)); 
                SET NEW.folio = @folio; UPDATE facturacion_empresas SET serie_pago = @consecutive WHERE id = NEW.academyPaymentOfficeSetId AND active = true;
            END`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS before_ac_charge_payment_insert`);
    }

}
