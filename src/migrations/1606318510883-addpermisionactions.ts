import { MigrationInterface, QueryRunner } from 'typeorm';

export class addpermisionactions1606318510883 implements MigrationInterface {
    name = 'addpermisionactions1606318510883';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE `permission_actions_action` (`permissionId` int NOT NULL, `actionId` int NOT NULL, INDEX `IDX_579107c19122b9ccc787770dc7` (`permissionId`), INDEX `IDX_ed0e55e485a32756caf0273e93` (`actionId`), PRIMARY KEY (`permissionId`, `actionId`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `action` ADD `version` int NOT NULL DEFAULT 0');
        await queryRunner.query('ALTER TABLE `action` ADD `uuid` varchar(36) NOT NULL');
        await queryRunner.query('ALTER TABLE `permission` ADD `version` int NOT NULL DEFAULT 0');
        await queryRunner.query('ALTER TABLE `permission` ADD `uuid` varchar(36) NOT NULL');
        await queryRunner.query('ALTER TABLE `action` CHANGE `createdAt` `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)');
        await queryRunner.query('ALTER TABLE `action` CHANGE `updatedAt` `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)');
        await queryRunner.query('ALTER TABLE `permission` CHANGE `createdAt` `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)');
        await queryRunner.query('ALTER TABLE `permission` CHANGE `updatedAt` `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)');
        await queryRunner.query('ALTER TABLE `permission_actions_action` ADD CONSTRAINT `FK_579107c19122b9ccc787770dc7f` FOREIGN KEY (`permissionId`) REFERENCES `permission`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE `permission_actions_action` ADD CONSTRAINT `FK_ed0e55e485a32756caf0273e936` FOREIGN KEY (`actionId`) REFERENCES `action`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `permission_actions_action` DROP FOREIGN KEY `FK_ed0e55e485a32756caf0273e936`');
        await queryRunner.query('ALTER TABLE `permission_actions_action` DROP FOREIGN KEY `FK_579107c19122b9ccc787770dc7f`');
        await queryRunner.query('ALTER TABLE `permission` CHANGE `updatedAt` `updatedAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
        await queryRunner.query('ALTER TABLE `permission` CHANGE `createdAt` `createdAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP');
        await queryRunner.query('ALTER TABLE `action` CHANGE `updatedAt` `updatedAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
        await queryRunner.query('ALTER TABLE `action` CHANGE `createdAt` `createdAt` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP');
        await queryRunner.query('ALTER TABLE `permission` DROP COLUMN `uuid`');
        await queryRunner.query('ALTER TABLE `permission` DROP COLUMN `version`');
        await queryRunner.query('ALTER TABLE `action` DROP COLUMN `uuid`');
        await queryRunner.query('ALTER TABLE `action` DROP COLUMN `version`');
        await queryRunner.query('DROP INDEX `IDX_ed0e55e485a32756caf0273e93` ON `permission_actions_action`');
        await queryRunner.query('DROP INDEX `IDX_579107c19122b9ccc787770dc7` ON `permission_actions_action`');
        await queryRunner.query('DROP TABLE `permission_actions_action`');
    }

}
