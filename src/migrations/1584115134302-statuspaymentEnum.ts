import {MigrationInterface, QueryRunner} from "typeorm";

export class statuspaymentEnum1584115134302 implements MigrationInterface {
    name = 'statuspaymentEnum1584115134302'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_f37d581e4af9370f744aa35c5f4`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` CHANGE `id_tie_venta` `id_tie_venta` int NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `tie_ventas` CHANGE `id_estado_pago` `id_estado_pago` enum ('1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '1'", undefined)
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `id_estado_pago` `id_estado_pago` enum ('1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '1'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` CHANGE `systemPaymentStatusId` `systemPaymentStatusId` enum ('1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '1'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP COLUMN `systemPaymentStatusId`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD `systemPaymentStatusId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP COLUMN `id_estado_pago`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD `id_estado_pago` int NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_ventas` DROP COLUMN `id_estado_pago`", undefined);
        await queryRunner.query("ALTER TABLE `tie_ventas` ADD `id_estado_pago` int NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_detalle` CHANGE `id_tie_venta` `id_tie_venta` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_f37d581e4af9370f744aa35c5f4` FOREIGN KEY (`systemPaymentStatusId`) REFERENCES `estado_pagos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
