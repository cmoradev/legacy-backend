import { MigrationInterface, QueryRunner } from 'typeorm';

export class addmorepropetiactions1606496897913 implements MigrationInterface {
    name = 'addmorepropetiactions1606496897913';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `action` ADD `description` varchar(255) NULL');
        await queryRunner.query('ALTER TABLE `action` ADD `icon` varchar(60) NULL');
        await queryRunner.query('ALTER TABLE `action` ADD `isDefault` tinyint(1) NOT NULL DEFAULT \'0\'');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `action` DROP COLUMN `isDefault`');
        await queryRunner.query('ALTER TABLE `action` DROP COLUMN `icon`');
        await queryRunner.query('ALTER TABLE `action` DROP COLUMN `description`');
    }

}
