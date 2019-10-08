import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixedTypesMiniStoreOrdersAndCreateLocationsEntity1570555049853 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `location` (`id` int NOT NULL AUTO_INCREMENT, `description` varchar(255) NOT NULL, `departmentId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` ADD `locationId` int NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `precio_proveedor_solicitud` `precio_proveedor_solicitud` decimal(15,2) NOT NULL DEFAULT \'0.000\'', undefined); // fd
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `precio_proveedor_recibido` `precio_proveedor_recibido` decimal(15,2) NOT NULL DEFAULT \'0.000\'', undefined); // fd
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `neto_solicitud` `neto_solicitud` decimal(15,2) NOT NULL DEFAULT \'0.000\'', undefined); // fd
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `neto_recibido` `neto_recibido` decimal(15,2) NOT NULL DEFAULT \'0.000\'', undefined); // fd
        await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.000\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float NULL', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` ADD CONSTRAINT `FK_13ab6160e683814bf9a6c3b0e0a` FOREIGN KEY (`locationId`) REFERENCES `location`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `location` ADD CONSTRAINT `FK_1fb4e06336853c384bb1dc565f8` FOREIGN KEY (`departmentId`) REFERENCES `departamentos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `location` DROP FOREIGN KEY `FK_1fb4e06336853c384bb1dc565f8`', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` DROP FOREIGN KEY `FK_13ab6160e683814bf9a6c3b0e0a`', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float(12) NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float(12) NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.00\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` DROP COLUMN `locationId`', undefined);
        await queryRunner.query('DROP TABLE `location`', undefined);
    }

}
