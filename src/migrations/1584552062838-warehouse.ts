import {MigrationInterface, QueryRunner} from "typeorm";

export class warehouse1584552062838 implements MigrationInterface {
    name = 'warehouse1584552062838'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `FK_f37d581e4af9370f744aa35c5f4` ON `tie_venta_pagos`", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` DROP COLUMN `id_proveedor`", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` DROP COLUMN `id_agente_creador`", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` DROP COLUMN `id_agente_editor`", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos_productos` DROP COLUMN `id_pedido`", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos_productos` DROP COLUMN `id_producto`", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` CHANGE `statusPayment` `statusPayment` enum ('1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '1'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school_payment` CHANGE `statusPayment` `statusPayment` enum ('1', '2', '3', '4', '5') NOT NULL DEFAULT '1'", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos_productos` ADD `id_producto` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos_productos` ADD `id_pedido` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` ADD `id_agente_editor` int NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` ADD `id_agente_creador` int NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_almacen_pedidos` ADD `id_proveedor` int NOT NULL", undefined);
        await queryRunner.query("CREATE INDEX `FK_f37d581e4af9370f744aa35c5f4` ON `tie_venta_pagos` (`systemPaymentStatusId`)", undefined);
    }

}
