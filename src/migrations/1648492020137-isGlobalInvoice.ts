import {MigrationInterface, QueryRunner} from "typeorm";

export class isGlobalInvoice1648492020137 implements MigrationInterface {
    name = 'isGlobalInvoice1648492020137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ac_facturas` ADD `isGlobal` enum ('0', '1') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` ADD `isGlobal` enum ('0', '1') NOT NULL DEFAULT '1'");
        await queryRunner.query("ALTER TABLE `tie_facturas` ADD `isGlobal` enum ('0', '1') NOT NULL DEFAULT '1'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_facturas` DROP COLUMN `isGlobal`");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` DROP COLUMN `isGlobal`");
        await queryRunner.query("ALTER TABLE `ac_facturas` DROP COLUMN `isGlobal`");
    }

}
