import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCalculoProductos1593528908170 implements MigrationInterface {
    name = 'addCalculoProductos1593528908170';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_productos` CHANGE `created_at` `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)', undefined);
        await queryRunner.query('ALTER TABLE `tie_productos` CHANGE `updated_at` `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)', undefined);
        await queryRunner.query('ALTER TABLE `tie_productos` ADD `version` int NOT NULL DEFAULT 0', undefined);
        await queryRunner.query('ALTER TABLE `tie_productos` ADD `uuid` varchar(36) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_productos` ADD `calculation` longtext NULL', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_productos` DROP COLUMN `calculation`', undefined);
        await queryRunner.query('ALTER TABLE `tie_productos` DROP COLUMN `uuid`', undefined);
        await queryRunner.query('ALTER TABLE `tie_productos` DROP COLUMN `version`', undefined);
        await queryRunner.query('ALTER TABLE `tie_productos` CHANGE `updatedAt` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', undefined);
        await queryRunner.query('ALTER TABLE `tie_productos` CHANGE `createdAt` `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
    }

}
