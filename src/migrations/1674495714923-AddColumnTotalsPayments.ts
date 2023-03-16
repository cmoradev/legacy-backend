import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnTotalsPayments1674495714923 implements MigrationInterface {
    name = 'AddColumnTotalsPayments1674495714923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `school_charge_payments` ADD `totalWithCharges` decimal(15,6) NULL DEFAULT 0.000000");
        await queryRunner.query("ALTER TABLE `school_charge_payments` ADD `totalWithoutCharges` decimal(15,6) NULL DEFAULT 0.000000");
        await queryRunner.query("ALTER TABLE `school_charge_payments` ADD `totalDiscount` decimal(15,6) NULL DEFAULT 0.000000");
        await queryRunner.query("ALTER TABLE `school_charge_payments` ADD `totalSurcharges` decimal(15,6) NULL DEFAULT 0.000000");
        await queryRunner.query("ALTER TABLE `ac_charge_payments` ADD `totalWithCharges` decimal(15,6) NULL DEFAULT 0.000000");
        await queryRunner.query("ALTER TABLE `ac_charge_payments` ADD `totalWithoutCharges` decimal(15,6) NULL DEFAULT 0.000000");
        await queryRunner.query("ALTER TABLE `ac_charge_payments` ADD `totalDiscount` decimal(15,6) NULL DEFAULT 0.000000");
        await queryRunner.query("ALTER TABLE `ac_charge_payments` ADD `totalSurcharges` decimal(15,6) NULL DEFAULT 0.000000");
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD `totalWithCharges` decimal(15,6) NULL DEFAULT 0.000000");
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD `totalWithoutCharges` decimal(15,6) NULL DEFAULT 0.000000");
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD `totalDiscount` decimal(15,6) NULL DEFAULT 0.000000");
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD `totalSurcharges` decimal(15,6) NULL DEFAULT 0.000000");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP COLUMN `totalSurcharges`");
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP COLUMN `totalDiscount`");
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP COLUMN `totalWithoutCharges`");
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP COLUMN `totalWithCharges`");
        await queryRunner.query("ALTER TABLE `ac_charge_payments` DROP COLUMN `totalSurcharges`");
        await queryRunner.query("ALTER TABLE `ac_charge_payments` DROP COLUMN `totalDiscount`");
        await queryRunner.query("ALTER TABLE `ac_charge_payments` DROP COLUMN `totalWithoutCharges`");
        await queryRunner.query("ALTER TABLE `ac_charge_payments` DROP COLUMN `totalWithCharges`");
        await queryRunner.query("ALTER TABLE `school_charge_payments` DROP COLUMN `totalSurcharges`");
        await queryRunner.query("ALTER TABLE `school_charge_payments` DROP COLUMN `totalDiscount`");
        await queryRunner.query("ALTER TABLE `school_charge_payments` DROP COLUMN `totalWithoutCharges`");
        await queryRunner.query("ALTER TABLE `school_charge_payments` DROP COLUMN `totalWithCharges`");
    }

}
