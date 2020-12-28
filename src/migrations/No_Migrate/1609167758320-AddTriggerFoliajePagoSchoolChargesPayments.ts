import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTriggerFoliajePagoSchoolChargesPayments1609167758320 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TRIGGER IF EXISTS before_school_charge_payment_insert`);
    await queryRunner.query(`
        CREATE TRIGGER before_school_charge_payment_insert
            BEFORE INSERT ON school_charge_payments
            FOR EACH ROW  
            BEGIN 
                SET @prefix = (SELECT foliaje_pago FROM facturacion_empresas WHERE id = NEW.schoolPaymentOfficeSetId AND active = true); 
                SET @consecutive = (SELECT serie_pago FROM facturacion_empresas WHERE id = NEW.schoolPaymentOfficeSetId AND active = true); 
                SET @consecutive = (SELECT @consecutive + 1);
                SET @folio = (CONCAT_WS('-', @prefix, @consecutive)); 
                SET NEW.folio = @folio; UPDATE facturacion_empresas SET serie_pago = @consecutive WHERE id = NEW.schoolPaymentOfficeSetId AND active = true;
            END`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TRIGGER IF EXISTS before_school_charge_payment_insert`);
  }

}
