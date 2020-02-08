import {MigrationInterface, QueryRunner} from "typeorm";

export class removemigrationdecimal1581179834364 implements MigrationInterface {
    name = 'removemigrationdecimal1581179834364'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` ADD `product_name` varchar(8) NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` decimal(15,6) NOT NULL DEFAULT 0.000000", undefined);
        await queryRunner.query("ALTER TABLE `tie_facturas` CHANGE `total` `total` float NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` CHANGE `precio` `precio` float NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` CHANGE `oldprecio` `oldprecio` float NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` CHANGE `precio` `precio` float NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobro_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_ventas` ADD CONSTRAINT `FK_3ed7fb60853bb5dbdd9e3f88a65` FOREIGN KEY (`id_agente`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_ventas` DROP FOREIGN KEY `FK_3ed7fb60853bb5dbdd9e3f88a65`", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobro_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` CHANGE `precio` `precio` float(12) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` CHANGE `oldprecio` `oldprecio` float(12) NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` CHANGE `precio` `precio` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float(12) NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float(12) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_facturas` CHANGE `total` `total` float(12) NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_forma_pago` DROP COLUMN `cantidad`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_forma_pago` ADD `cantidad` float(12) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` DROP COLUMN `product_name`", undefined);
    }

}
