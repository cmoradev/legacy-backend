import { MigrationInterface, QueryRunner } from 'typeorm';

export class tieVentaPagos21575911802364 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP INDEX `FK_0def6dbec21d7387bb79c3eb921` ON `ac_descuentos`', undefined);
    await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.000\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float NULL', undefined);
    // await queryRunner.query('ALTER TABLE `ciclos` CHANGE `fecha_inicio` `fecha_inicio` timestamp NOT NULL', undefined);
    //  await queryRunner.query('ALTER TABLE `ciclos` CHANGE `fecha_fin` `fecha_fin` timestamp NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` DROP FOREIGN KEY `FK_53eaf485ad3e6c457d161a2a9d5`', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` DROP FOREIGN KEY `FK_328225821f734d8ff32cb254099`', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` DROP FOREIGN KEY `FK_1172ad2368b719a2f2331692667`', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` DROP FOREIGN KEY `FK_77907699119ecfea725633337f0`', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `id_ciclo` `id_ciclo` int NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `id_plantel` `id_plantel` int NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `id_nivel` `id_nivel` int NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `id_tipo_concepto` `id_tipo_concepto` int NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `id_academia` `id_academia` int NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `facturacion_claves` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` ADD CONSTRAINT `FK_53eaf485ad3e6c457d161a2a9d5` FOREIGN KEY (`id_ciclo`) REFERENCES `ciclos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` ADD CONSTRAINT `FK_328225821f734d8ff32cb254099` FOREIGN KEY (`id_plantel`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    // await queryRunner.query('ALTER TABLE `ac_aconceptos` ADD CONSTRAINT `FK_0c0ad3bf9d8d9b8153c6d1a8e5e` FOREIGN KEY (`id_nivel`) REFERENCES `niveles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` ADD CONSTRAINT `FK_1172ad2368b719a2f2331692667` FOREIGN KEY (`id_tipo_concepto`) REFERENCES `ac_conceptos_cobro`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` ADD CONSTRAINT `FK_77907699119ecfea725633337f0` FOREIGN KEY (`id_academia`) REFERENCES `ac_academias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `ac_aconceptos` DROP FOREIGN KEY `FK_77907699119ecfea725633337f0`', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` DROP FOREIGN KEY `FK_1172ad2368b719a2f2331692667`', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` DROP FOREIGN KEY `FK_0c0ad3bf9d8d9b8153c6d1a8e5e`', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` DROP FOREIGN KEY `FK_328225821f734d8ff32cb254099`', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` DROP FOREIGN KEY `FK_53eaf485ad3e6c457d161a2a9d5`', undefined);
    await queryRunner.query('ALTER TABLE `facturacion_claves` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', undefined);
    await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `id_academia` `id_academia` int NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `id_tipo_concepto` `id_tipo_concepto` int NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `id_nivel` `id_nivel` int NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `id_plantel` `id_plantel` int NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `id_ciclo` `id_ciclo` int NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` ADD CONSTRAINT `FK_77907699119ecfea725633337f0` FOREIGN KEY (`id_academia`) REFERENCES `ac_academias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` ADD CONSTRAINT `FK_1172ad2368b719a2f2331692667` FOREIGN KEY (`id_tipo_concepto`) REFERENCES `ac_conceptos_cobro`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` ADD CONSTRAINT `FK_328225821f734d8ff32cb254099` FOREIGN KEY (`id_plantel`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` ADD CONSTRAINT `FK_53eaf485ad3e6c457d161a2a9d5` FOREIGN KEY (`id_ciclo`) REFERENCES `ciclos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    await queryRunner.query('ALTER TABLE `ciclos` CHANGE `fecha_fin` `fecha_fin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
    await queryRunner.query('ALTER TABLE `ciclos` CHANGE `fecha_inicio` `fecha_inicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
    await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float(12) NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float(12) NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.00\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float(12) NOT NULL', undefined);
    await queryRunner.query('CREATE INDEX `FK_0def6dbec21d7387bb79c3eb921` ON `ac_descuentos` (`id_formaplicacion`)', undefined);
  }

}
