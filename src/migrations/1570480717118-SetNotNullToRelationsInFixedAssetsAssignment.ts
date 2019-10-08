import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetNotNullToRelationsInFixedAssetsAssignment1570480717118 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `precio_proveedor_solicitud` `precio_proveedor_solicitud` double NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `precio_proveedor_recibido` `precio_proveedor_recibido` double NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `neto_solicitud` `neto_solicitud` double NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `neto_recibido` `neto_recibido` double NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.000\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float NULL', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` DROP FOREIGN KEY `FK_cb47ea0d9a1b4963365891cde88`', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` DROP FOREIGN KEY `FK_f9c314976f45b7f2c2580713619`', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` DROP FOREIGN KEY `FK_b2bfd20bf6c9248dc268848537b`', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` CHANGE `employeeId` `employeeId` int NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` CHANGE `fixedAssetId` `fixedAssetId` int NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` CHANGE `responsiveLetterId` `responsiveLetterId` int NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` ADD CONSTRAINT `FK_cb47ea0d9a1b4963365891cde88` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` ADD CONSTRAINT `FK_f9c314976f45b7f2c2580713619` FOREIGN KEY (`fixedAssetId`) REFERENCES `fixed_asset`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` ADD CONSTRAINT `FK_b2bfd20bf6c9248dc268848537b` FOREIGN KEY (`responsiveLetterId`) REFERENCES `responsive_letter`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` DROP FOREIGN KEY `FK_b2bfd20bf6c9248dc268848537b`', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` DROP FOREIGN KEY `FK_f9c314976f45b7f2c2580713619`', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` DROP FOREIGN KEY `FK_cb47ea0d9a1b4963365891cde88`', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` CHANGE `responsiveLetterId` `responsiveLetterId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` CHANGE `fixedAssetId` `fixedAssetId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` CHANGE `employeeId` `employeeId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` ADD CONSTRAINT `FK_b2bfd20bf6c9248dc268848537b` FOREIGN KEY (`responsiveLetterId`) REFERENCES `responsive_letter`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` ADD CONSTRAINT `FK_f9c314976f45b7f2c2580713619` FOREIGN KEY (`fixedAssetId`) REFERENCES `fixed_asset`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `fixed_asset_assignment` ADD CONSTRAINT `FK_cb47ea0d9a1b4963365891cde88` FOREIGN KEY (`employeeId`) REFERENCES `employee`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float(12) NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float(12) NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.00\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `neto_recibido` `neto_recibido` double(22) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `neto_solicitud` `neto_solicitud` double(22) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `precio_proveedor_recibido` `precio_proveedor_recibido` double(22) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `precio_proveedor_solicitud` `precio_proveedor_solicitud` double(22) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float(12) NOT NULL', undefined);
    }

}
