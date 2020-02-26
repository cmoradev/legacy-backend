import {MigrationInterface, QueryRunner} from "typeorm";

export class cargosextraToBase1582731070779 implements MigrationInterface {
    name = 'cargosextraToBase1582731070779'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ac_descuentos` DROP COLUMN `created_at`", undefined);
        await queryRunner.query("ALTER TABLE `ac_descuentos` DROP COLUMN `updated_at`", undefined);
        await queryRunner.query("ALTER TABLE `ac_descuentos` ADD `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `ac_descuentos` ADD `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `ac_descuentos` ADD `version` int NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `ac_descuentos` ADD `uuid` varchar(36) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ac_descuentos` DROP COLUMN `uuid`", undefined);
        await queryRunner.query("ALTER TABLE `ac_descuentos` DROP COLUMN `version`", undefined);
        await queryRunner.query("ALTER TABLE `ac_descuentos` DROP COLUMN `updatedAt`", undefined);
        await queryRunner.query("ALTER TABLE `ac_descuentos` DROP COLUMN `createdAt`", undefined);
        await queryRunner.query("ALTER TABLE `ac_descuentos` ADD `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP", undefined);
        await queryRunner.query("ALTER TABLE `ac_descuentos` ADD `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP", undefined);
    }

}
