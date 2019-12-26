import { MigrationInterface, QueryRunner } from 'typeorm';

export class inscriptconceptsAC1577391892214 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `precio` `precio` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `oldprecio` `oldprecio` float NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `id_academia` `id_academia` int NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `id_concepto_cobro` `id_concepto_cobro` int NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `id_estado_pago` `id_estado_pago` int NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` ADD CONSTRAINT `FK_af117cd7c2d895c623d46eeb47e` FOREIGN KEY (`id_academia`) REFERENCES `ac_academias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` ADD CONSTRAINT `FK_5559a04aad9b9940a75929e9843` FOREIGN KEY (`id_concepto_cobro`) REFERENCES `ac_conceptos_cobro`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` ADD CONSTRAINT `FK_816a70fccf1b44fc1e3069f28b3` FOREIGN KEY (`id_estado_pago`) REFERENCES `estado_pagos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` DROP FOREIGN KEY `FK_816a70fccf1b44fc1e3069f28b3`', undefined);
    await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` DROP FOREIGN KEY `FK_5559a04aad9b9940a75929e9843`', undefined);
    await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` DROP FOREIGN KEY `FK_af117cd7c2d895c623d46eeb47e`', undefined);
    await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `id_estado_pago` `id_estado_pago` int NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `id_concepto_cobro` `id_concepto_cobro` int NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `id_academia` `id_academia` int NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `oldprecio` `oldprecio` float(12) NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `precio` `precio` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float(12) NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float(12) NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float(12) NULL', undefined);
  }

}
