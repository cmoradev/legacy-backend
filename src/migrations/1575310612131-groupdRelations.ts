import { MigrationInterface, QueryRunner } from 'typeorm';

export class groupdRelations1575310612131 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `grupos` DROP FOREIGN KEY `FK_d8e745eb38e887e75ae3cf1256b`', undefined);
    // await queryRunner.query("DROP INDEX `FK_2bb7102d7bce7bc902d333e6754` ON `tie_venta_pagos`", undefined);
    // await queryRunner.query("DROP INDEX `FK_732d382445b2c549b6293d564f5` ON `grupos`", undefined);
    // await queryRunner.query("DROP INDEX `FK_f8f8c33f32a9acb5b7dd28b735d` ON `alumnos`", undefined);
    await queryRunner.query('ALTER TABLE `grupos` CHANGE `cycleId` `groupCycleId` int NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.000\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float NULL', undefined);
    // await queryRunner.query("ALTER TABLE `ciclos` CHANGE `fecha_inicio` `fecha_inicio` timestamp NOT NULL", undefined);
    // await queryRunner.query("ALTER TABLE `ciclos` CHANGE `fecha_fin` `fecha_fin` timestamp NOT NULL", undefined);
    await queryRunner.query('ALTER TABLE `grupos` ADD CONSTRAINT `FK_48614f265ca08797f435aee562c` FOREIGN KEY (`groupCycleId`) REFERENCES `ciclos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `grupos` DROP FOREIGN KEY `FK_48614f265ca08797f435aee562c`', undefined);
    await queryRunner.query('ALTER TABLE `ciclos` CHANGE `fecha_fin` `fecha_fin` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
    await queryRunner.query('ALTER TABLE `ciclos` CHANGE `fecha_inicio` `fecha_inicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', undefined);
    await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float(12) NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float(12) NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.00\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float(12) NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `grupos` CHANGE `groupCycleId` `cycleId` int NULL', undefined);
    await queryRunner.query('CREATE INDEX `FK_f8f8c33f32a9acb5b7dd28b735d` ON `alumnos` (`studentCampusId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_732d382445b2c549b6293d564f5` ON `grupos` (`groupGradeId`)', undefined);
    await queryRunner.query('CREATE INDEX `FK_2bb7102d7bce7bc902d333e6754` ON `tie_venta_pagos` (`systemPaymentStatusId`)', undefined);
    await queryRunner.query('ALTER TABLE `grupos` ADD CONSTRAINT `FK_d8e745eb38e887e75ae3cf1256b` FOREIGN KEY (`cycleId`) REFERENCES `ciclos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
  }

}
