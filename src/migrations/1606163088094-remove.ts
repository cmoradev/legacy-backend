import {MigrationInterface, QueryRunner} from "typeorm";

export class remove1606163088094 implements MigrationInterface {
    name = 'remove1606163088094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `route` DROP FOREIGN KEY `FK_2bf40bee2cce314e08c93d995dd`");
        await queryRunner.query("ALTER TABLE `route` DROP COLUMN `parentId`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `route` ADD `parentId` int NULL");
        await queryRunner.query("ALTER TABLE `route` ADD CONSTRAINT `FK_2bf40bee2cce314e08c93d995dd` FOREIGN KEY (`parentId`) REFERENCES `route`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
