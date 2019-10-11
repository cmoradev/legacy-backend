import { MigrationInterface, QueryRunner } from 'typeorm';

export class WasCreatedLocationsAndClassificationsEntities1570720438000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `classification` (`id` int NOT NULL AUTO_INCREMENT, `description` varchar(255) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset` ADD `classificationId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `location` ADD `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
        await queryRunner.query('ALTER TABLE `location` ADD `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.000\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float NULL', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset` ADD CONSTRAINT `FK_742c732c1b7a90cb07f08d38bca` FOREIGN KEY (`classificationId`) REFERENCES `classification`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `fixed_asset` DROP FOREIGN KEY `FK_742c732c1b7a90cb07f08d38bca`', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float(12) NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float(12) NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.00\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `location` DROP COLUMN `updated_at`', undefined);
        await queryRunner.query('ALTER TABLE `location` DROP COLUMN `created_at`', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset` DROP COLUMN `classificationId`', undefined);
        await queryRunner.query('DROP TABLE `classification`', undefined);
    }

}
