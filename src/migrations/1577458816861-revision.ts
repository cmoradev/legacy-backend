import {MigrationInterface, QueryRunner} from "typeorm";

export class revision1577458816861 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` ADD `acInscriptionId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_facturas` CHANGE `total` `total` float NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` CHANGE `precio` `precio` float NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` CHANGE `oldprecio` `oldprecio` float NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` CHANGE `precio` `precio` float NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobro_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` ADD CONSTRAINT `FK_d5968e62248f01f13416d9eaa5d` FOREIGN KEY (`acInscriptionId`) REFERENCES `ac_inscripciones_alumnos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` DROP FOREIGN KEY `FK_d5968e62248f01f13416d9eaa5d`", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobro_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_cobro_detalle` CHANGE `precio` `precio` float(12) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` CHANGE `oldprecio` `oldprecio` float(12) NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` CHANGE `precio` `precio` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float(12) NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float(12) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_facturas` CHANGE `total` `total` float(12) NULL", undefined);
        await queryRunner.query("ALTER TABLE `ac_inscrip_conceptos` DROP COLUMN `acInscriptionId`", undefined);
    }

}
