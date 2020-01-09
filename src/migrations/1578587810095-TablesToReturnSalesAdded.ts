import { MigrationInterface, QueryRunner } from 'typeorm';

export class TablesToReturnSalesAdded1578587810095 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `sale_return_products` (`id` int NOT NULL AUTO_INCREMENT, `quantity` decimal(15,6) NOT NULL DEFAULT \'0.000000\', `amount` decimal(15,6) NOT NULL DEFAULT \'0.000000\', `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL, `saleDetailId` int NOT NULL, `saleReturnId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `sale_returns` (`id` int NOT NULL AUTO_INCREMENT, `amount` decimal(15,6) NOT NULL DEFAULT \'0.000000\', `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL, `agentId` int NOT NULL, `saleId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `precio` `precio` float NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `oldprecio` `oldprecio` float NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_detalle` CHANGE `precio` `precio` float NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_forma_pago` CHANGE `cantidad` `cantidad` float NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `sale_return_products` ADD CONSTRAINT `FK_54e18a9c37de579cae932c33001` FOREIGN KEY (`saleDetailId`) REFERENCES `tie_venta_detalle`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `sale_return_products` ADD CONSTRAINT `FK_dbaa1b26749a69e96d18686d3fa` FOREIGN KEY (`saleReturnId`) REFERENCES `sale_returns`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `sale_returns` ADD CONSTRAINT `FK_00ec3e736d567b729aeacb1bccf` FOREIGN KEY (`agentId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `sale_returns` ADD CONSTRAINT `FK_0f89a207a12015c14c5fc3e4df0` FOREIGN KEY (`saleId`) REFERENCES `tie_ventas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `sale_returns` DROP FOREIGN KEY `FK_0f89a207a12015c14c5fc3e4df0`', undefined);
        await queryRunner.query('ALTER TABLE `sale_returns` DROP FOREIGN KEY `FK_00ec3e736d567b729aeacb1bccf`', undefined);
        await queryRunner.query('ALTER TABLE `sale_return_products` DROP FOREIGN KEY `FK_dbaa1b26749a69e96d18686d3fa`', undefined);
        await queryRunner.query('ALTER TABLE `sale_return_products` DROP FOREIGN KEY `FK_54e18a9c37de579cae932c33001`', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobros` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_cobro_detalle` CHANGE `precio` `precio` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_aconceptos` CHANGE `precio` `precio` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `oldprecio` `oldprecio` float(12) NULL', undefined);
        await queryRunner.query('ALTER TABLE `ac_inscrip_conceptos` CHANGE `precio` `precio` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cantidad` `cantidad` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_pagos` CHANGE `cambio` `cambio` float(12) NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_venta_forma_pago` CHANGE `cantidad` `cantidad` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cambio` `cambio` float(12) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_almacen_pedidos` CHANGE `neto_solicitud` `neto_solicitud` float(12) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float(12) NULL', undefined);
        await queryRunner.query('DROP TABLE `sale_returns`', undefined);
        await queryRunner.query('DROP TABLE `sale_return_products`', undefined);
    }

}
