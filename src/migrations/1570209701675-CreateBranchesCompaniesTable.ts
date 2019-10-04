import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBranchesCompaniesTable1570209701675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `branch_company` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `matrixCompanyId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `precio_proveedor_solicitud` `precio_proveedor_solicitud` double NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `precio_proveedor_recibido` `precio_proveedor_recibido` double NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `neto_solicitud` `neto_solicitud` double NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `neto_recibido` `neto_recibido` double NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.000\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `branch_company` ADD CONSTRAINT `FK_08c976723ec5f84f086a1609a8d` FOREIGN KEY (`matrixCompanyId`) REFERENCES `matrix_company`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `branch_company` DROP FOREIGN KEY `FK_08c976723ec5f84f086a1609a8d`', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float(12) NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_detalle` CHANGE `cantidad` `cantidad` decimal(15,2) NOT NULL DEFAULT \'0.00\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `neto_recibido` `neto_recibido` double(22) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `neto_solicitud` `neto_solicitud` double(22) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `precio_proveedor_recibido` `precio_proveedor_recibido` double(22) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos_productos` CHANGE `precio_proveedor_solicitud` `precio_proveedor_solicitud` double(22) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float(12) NULL', undefined);
        await queryRunner.query('DROP TABLE `branch_company`', undefined);
    }

}
