import {MigrationInterface, QueryRunner} from "typeorm";

export class addbranchofficeTopaymentStore1589823171584 implements MigrationInterface {
    name = 'addbranchofficeTopaymentStore1589823171584'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD `storePaymentOfficeId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD CONSTRAINT `FK_57b8138f27388d7ea044b1546da` FOREIGN KEY (`storePaymentOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP FOREIGN KEY `FK_57b8138f27388d7ea044b1546da`", undefined);
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP COLUMN `storePaymentOfficeId`", undefined);
    }

}
