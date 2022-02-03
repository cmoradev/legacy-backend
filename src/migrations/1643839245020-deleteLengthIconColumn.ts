import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteLengthIconColumn1643839245020 implements MigrationInterface {
    name = 'deleteLengthIconColumn1643839245020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `action` DROP COLUMN `icon`");
        await queryRunner.query("ALTER TABLE `action` ADD `icon` text NULL");
        await queryRunner.query("ALTER TABLE `route` DROP COLUMN `icon`");
        await queryRunner.query("ALTER TABLE `route` ADD `icon` text NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `route` DROP COLUMN `icon`");
        await queryRunner.query("ALTER TABLE `route` ADD `icon` varchar(50) NOT NULL");
        await queryRunner.query("ALTER TABLE `action` DROP COLUMN `icon`");
        await queryRunner.query("ALTER TABLE `action` ADD `icon` varchar(255) NULL");
    }

}
