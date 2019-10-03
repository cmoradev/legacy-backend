import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationStudyPlanHaveInscriptions1569875964290 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `inscripciones` ADD `studyPlanId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float NULL', undefined);
        await queryRunner.query('ALTER TABLE `check_in` CHANGE `isDating` `isDating` tinyint NOT NULL DEFAULT 0', undefined);
        await queryRunner.query('ALTER TABLE `usuarios` CHANGE `canAccessAnecdoticos` `canAccessAnecdoticos` tinyint NOT NULL DEFAULT 0', undefined);
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
        await queryRunner.query('ALTER TABLE `inscripciones` ADD CONSTRAINT `FK_3824dd4c580c977607f9e80f058` FOREIGN KEY (`studyPlanId`) REFERENCES `study_plan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `inscripciones` DROP FOREIGN KEY `FK_3824dd4c580c977607f9e80f058`', undefined);
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
        await queryRunner.query('ALTER TABLE `usuarios` CHANGE `canAccessAnecdoticos` `canAccessAnecdoticos` tinyint NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `check_in` CHANGE `isDating` `isDating` tinyint NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `total` `total` float(12) NULL', undefined);
        await queryRunner.query('ALTER TABLE `inscripciones` DROP COLUMN `studyPlanId`', undefined);
    }

}
