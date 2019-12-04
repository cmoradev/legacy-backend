import { MigrationInterface, QueryRunner } from 'typeorm';

export class academyconcepts1575405396665 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    // await queryRunner.query('DROP INDEX `FK_2bb7102d7bce7bc902d333e6754` ON `tie_venta_pagos`', undefined);
    // await queryRunner.query('DROP INDEX `FK_e30334e2ce6f36d36a30375eebc` ON `assignment_inscription`', undefined);
    // await queryRunner.query('DROP INDEX `FK_2bd8812e74f2cd403daaf5c40bb` ON `inscripciones`', undefined);
    // await queryRunner.query('DROP INDEX `FK_2152e25097fda253aeaa0ee052f` ON `inscripciones`', undefined);
    // await queryRunner.query('DROP INDEX `FK_68a88d9a43c0efb6373bfabd7d0` ON `inscripciones`', undefined);
    // await queryRunner.query('DROP INDEX `FK_50523f498a736535282f2c0688f` ON `inscripciones`', undefined);
    // await queryRunner.query('DROP INDEX `FK_58140416443f2e4fd5535e80b31` ON `inscripciones`', undefined);
    // await queryRunner.query('DROP INDEX `FK_6357ee5428f4bbe4eec13b38496` ON `inscripciones`', undefined);
    // await queryRunner.query('DROP INDEX `FK_c04fe869cbb7e9a8b90aca9a93c` ON `inscripciones`', undefined);
    // await queryRunner.query('DROP INDEX `FK_77d429bab1f3b1e633e6278705a` ON `inscripciones`', undefined);
    // await queryRunner.query('DROP INDEX `FK_1f7b5021d0b463ee36cc4f91089` ON `inscripciones`', undefined);
    // await queryRunner.query('DROP INDEX `FK_700ef1478455373625d9f82cc12` ON `inscripciones`', undefined);
    // await queryRunner.query('DROP INDEX `FK_3824dd4c580c977607f9e80f058` ON `inscripciones`', undefined);
    // await queryRunner.query('DROP INDEX `FK_f8f8c33f32a9acb5b7dd28b735d` ON `alumnos`', undefined);
    // await queryRunner.query('DROP INDEX `FK_732d382445b2c549b6293d564f5` ON `grupos`', undefined);
    // await queryRunner.query('DROP INDEX `FK_d8e745eb38e887e75ae3cf1256b` ON `grupos`', undefined);
    // await queryRunner.query('ALTER TABLE `ac_conceptos_cobro` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
    // await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float NOT NULL', undefined);
    // await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.000\'', undefined);
    // await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
    // await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL', undefined);
    // await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float NULL DEFAULT \'0\'', undefined);
    // await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float NOT NULL DEFAULT \'0\'', undefined);
    // await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float NULL', undefined);
    // await queryRunner.query('ALTER TABLE `ciclos` CHANGE `fecha_inicio` `fecha_inicio` timestamp NOT NULL', undefined);
    // await queryRunner.query('ALTER TABLE `ciclos` CHANGE `fecha_fin` `fecha_fin` timestamp NOT NULL', undefined);
    // await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float NOT NULL DEFAULT \'0\'', undefined);
    // await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `id_ciclo` `id_ciclo` int NULL', undefined);
    // await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `id_plantel` `id_plantel` int NULL', undefined);
    // await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `id_nivel` `id_nivel` int NULL', undefined);
    // await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `id_tipo_concepto` `id_tipo_concepto` int NULL', undefined);
    // await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `id_academia` `id_academia` int NULL', undefined);
    // // await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
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
    await queryRunner.query('ALTER TABLE `ciclos` CHANGE `fecha_fin` `fecha_fin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
    await queryRunner.query('ALTER TABLE `ciclos` CHANGE `fecha_inicio` `fecha_inicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', undefined);
    await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float(12) NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float(12) NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.00\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float(12) NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_conceptos_cobro` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', undefined);
    await queryRunner.query('CREATE INDEX `FK_d8e745eb38e887e75ae3cf1256b` ON `grupos` (`groupCycleId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_732d382445b2c549b6293d564f5` ON `grupos` (`groupGradeId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_f8f8c33f32a9acb5b7dd28b735d` ON `alumnos` (`studentCampusId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_3824dd4c580c977607f9e80f058` ON `inscripciones` (`inscripStudyPlanId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_700ef1478455373625d9f82cc12` ON `inscripciones` (`inscripStudyPlanVariantId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_1f7b5021d0b463ee36cc4f91089` ON `inscripciones` (`inscripClassroomId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_77d429bab1f3b1e633e6278705a` ON `inscripciones` (`inscripAgentEditorId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_c04fe869cbb7e9a8b90aca9a93c` ON `inscripciones` (`inscripAgentCreatorId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_6357ee5428f4bbe4eec13b38496` ON `inscripciones` (`inscripCampusId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_58140416443f2e4fd5535e80b31` ON `inscripciones` (`inscripCycleId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_50523f498a736535282f2c0688f` ON `inscripciones` (`inscripLevelId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_68a88d9a43c0efb6373bfabd7d0` ON `inscripciones` (`inscripGradeId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_2152e25097fda253aeaa0ee052f` ON `inscripciones` (`inscripGroupId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_2bd8812e74f2cd403daaf5c40bb` ON `inscripciones` (`inscripStudentId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_e30334e2ce6f36d36a30375eebc` ON `assignment_inscription` (`assignmentsInscriptionId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_2bb7102d7bce7bc902d333e6754` ON `tie_venta_pagos` (`systemPaymentStatusId`)', undefined);
  }

}
