import {MigrationInterface, QueryRunner} from "typeorm";

export class addGlobalUuidPayments1648739818088 implements MigrationInterface {
    name = 'addGlobalUuidPayments1648739818088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ac_charge_payments` ADD `globalUuid` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `school_charge_payments` ADD `globalUuid` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` ADD `globalUuid` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_venta_pagos` DROP COLUMN `globalUuid`");
        await queryRunner.query("ALTER TABLE `school_charge_payments` DROP COLUMN `globalUuid`");
        await queryRunner.query("ALTER TABLE `ac_charge_payments` DROP COLUMN `globalUuid`");
    }

}
