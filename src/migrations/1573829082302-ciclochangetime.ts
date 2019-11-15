import { MigrationInterface, QueryRunner } from 'typeorm';

export class ciclochangetime1573829082302 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.000\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float NULL', undefined);
    await queryRunner.query('ALTER TABLE `ciclos` CHANGE `fecha_inicio` `fecha_inicio` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP' , undefined);
    await queryRunner.query('ALTER TABLE `ciclos` CHANGE `fecha_fin` `fecha_fin` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
    await queryRunner.query('ALTER TABLE `ciclos` CHANGE `active` `active` tinyint  NULL DEFAULT \'0\'', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `ciclos` DROP COLUMN `active`', undefined);
    await queryRunner.query('ALTER TABLE `ciclos` ADD `active` int NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `ciclos` DROP COLUMN `fecha_fin`', undefined);
    await queryRunner.query('ALTER TABLE `ciclos` ADD `fecha_fin` date NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `ciclos` DROP COLUMN `fecha_inicio`', undefined);
    await queryRunner.query('ALTER TABLE `ciclos` ADD `fecha_inicio` date NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float(12) NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float(12) NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.00\'', undefined);
    await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float(12) NOT NULL', undefined);
  }

}
