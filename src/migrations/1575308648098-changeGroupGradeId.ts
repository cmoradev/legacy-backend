import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeGroupGradeId1575308648098 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    //  await queryRunner.query('ALTER TABLE `grupos` DROP FOREIGN KEY `FK_732d382445b2c549b6293d564f5`', undefined);
    // await queryRunner.query('DROP INDEX `FK_2bb7102d7bce7bc902d333e6754` ON `tie_venta_pagos`', undefined);
    // await queryRunner.query('DROP INDEX `FK_f8f8c33f32a9acb5b7dd28b735d` ON `alumnos`', undefined);
    await queryRunner.query('ALTER TABLE `grupos` CHANGE `gradeId` `groupGradeId` int NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `escolar` `escolar` int NULL DEFAULT \'1\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
    await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.000\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float NULL', undefined);
    // await queryRunner.query('ALTER TABLE `ciclos` CHANGE `fecha_inicio` `fecha_inicio` timestamp NOT NULL', undefined);
   //  await queryRunner.query('ALTER TABLE `ciclos` CHANGE `fecha_fin` `fecha_fin` timestamp NOT NULL', undefined);
    // await queryRunner.query('ALTER TABLE `ciclos` CHANGE `active` `active` tinyint NOT NULL', undefined);
   // await queryRunner.query('ALTER TABLE `states` CHANGE `country_id` `country_id` int NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_f37d581e4af9370f744aa35c5f4` FOREIGN KEY (`systemPaymentStatusId`) REFERENCES `estado_pagos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    await queryRunner.query('ALTER TABLE `grupos` ADD CONSTRAINT `FK_ec273da23e6dac40a9278b337fd` FOREIGN KEY (`groupGradeId`) REFERENCES `grados`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
   // await queryRunner.query('ALTER TABLE `alumnos` ADD CONSTRAINT `FK_bfed7d2edbc0f0af959ce26bb50` FOREIGN KEY (`studentCampusId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    // await queryRunner.query('ALTER TABLE `states` ADD CONSTRAINT `FK_f3bbd0bc19bb6d8a887add08461` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    // await queryRunner.query('ALTER TABLE `cities` ADD CONSTRAINT `FK_1229b56aa12cae674b824fccd13` FOREIGN KEY (`state_id`) REFERENCES `states`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `cities` DROP FOREIGN KEY `FK_1229b56aa12cae674b824fccd13`', undefined);
    await queryRunner.query('ALTER TABLE `states` DROP FOREIGN KEY `FK_f3bbd0bc19bb6d8a887add08461`', undefined);
    await queryRunner.query('ALTER TABLE `alumnos` DROP FOREIGN KEY `FK_bfed7d2edbc0f0af959ce26bb50`', undefined);
    await queryRunner.query('ALTER TABLE `grupos` DROP FOREIGN KEY `FK_ec273da23e6dac40a9278b337fd`', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_f37d581e4af9370f744aa35c5f4`', undefined);
    await queryRunner.query('ALTER TABLE `states` CHANGE `country_id` `country_id` int NOT NULL DEFAULT \'1\'', undefined);
    await queryRunner.query('ALTER TABLE `ciclos` CHANGE `active` `active` tinyint NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ciclos` CHANGE `fecha_fin` `fecha_fin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
    await queryRunner.query('ALTER TABLE `ciclos` CHANGE `fecha_inicio` `fecha_inicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
    await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float(12) NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float(12) NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.00\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float(12) NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `escolar` `escolar` int(2) NULL DEFAULT \'1\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `updated_at` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', undefined);
    await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `grupos` CHANGE `groupGradeId` `gradeId` int NULL', undefined);
    await queryRunner.query('CREATE INDEX `FK_f8f8c33f32a9acb5b7dd28b735d` ON `alumnos` (`studentCampusId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_2bb7102d7bce7bc902d333e6754` ON `tie_venta_pagos` (`systemPaymentStatusId`)', undefined);
    await queryRunner.query('ALTER TABLE `grupos` ADD CONSTRAINT `FK_732d382445b2c549b6293d564f5` FOREIGN KEY (`gradeId`) REFERENCES `grados`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
  }

}
