import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class BeforeInsertSalePaymentTriggerSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const queryRunner = connection;
        await queryRunner.query(`DROP TRIGGER IF EXISTS before_venta_pago_insert`);
        await queryRunner.query(`
        CREATE TRIGGER before_venta_pago_insert 
            BEFORE INSERT ON tie_venta_pagos
            FOR EACH ROW BEGIN 
                SET @prefix = (SELECT foliaje_pago FROM facturacion_empresas WHERE id= NEW.storePaymentOfficeSetId AND active = true); 
                SET @consecutive = (SELECT serie_pago FROM facturacion_empresas WHERE id= NEW.storePaymentOfficeSetId AND active = true); 
                SET @consecutive = (SELECT @consecutive + 1); SET @folio = (CONCAT_WS('-', @prefix, @consecutive)); 
                SET NEW.folio = @folio; UPDATE facturacion_empresas SET serie_pago = @consecutive WHERE id= NEW.storePaymentOfficeSetId AND active = true;
                
            END`);

    }
}
