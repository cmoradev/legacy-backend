import { MigrationInterface, QueryRunner } from 'typeorm';

export class removedecimalministore1581180596221 implements MigrationInterface {
    name = 'removedecimalministore1581180596221';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` decimal(15,6) NULL DEFAULT 0.000000', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` decimal(15,6) NOT NULL DEFAULT 0.000000', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` decimal(15,6) NOT NULL DEFAULT 0.000000', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` decimal(15,6) NULL DEFAULT 0.000000', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` decimal(15,6) NOT NULL DEFAULT 0.000000', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `precio` `precio` float NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `oldprecio` `oldprecio` float NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_detalle` CHANGE `precio` `precio` float NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_detalle` CHANGE `precio` `precio` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `oldprecio` `oldprecio` float(12) NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `precio` `precio` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` DROP COLUMN `cantidad`', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` ADD `cantidad` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` DROP COLUMN `cambio`', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` ADD `cambio` float(12) NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` DROP COLUMN `cambio`', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` ADD `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` DROP COLUMN `neto_solicitud`', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` ADD `neto_solicitud` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` DROP COLUMN `total`', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` ADD `total` float(12) NULL', undefined);
    }

}
