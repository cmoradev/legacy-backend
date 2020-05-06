import { MigrationInterface, QueryRunner } from 'typeorm';

export class authtokens1588781906441 implements MigrationInterface {
    name = 'authtokens1588781906441';

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.query('DROP INDEX `oauth_access_tokens_user_id_index` ON `oauth_access_tokens`', undefined);
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` CHANGE `created_at` `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)', undefined);
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` CHANGE `updated_at` `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)', undefined);
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` ADD `version` int NOT NULL DEFAULT 0', undefined);
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` ADD `uuid` varchar(36) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` ADD `refresh` tinyint(1) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` DROP PRIMARY KEY', undefined);
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` DROP COLUMN `id`', undefined);
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` ADD `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` DROP COLUMN `id`', undefined);
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` ADD `id` varchar(100) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` ADD PRIMARY KEY (`id`)', undefined);
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` DROP COLUMN `refresh`', undefined);
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` DROP COLUMN `uuid`', undefined);
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` DROP COLUMN `version`', undefined);
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` CHANGE `createdAt `updated_at` timestamp NULL', undefined);
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` CHANGE `updatedAt` `created_at` timestamp NULL', undefined);
        await queryRunner.query('CREATE INDEX `oauth_access_tokens_user_id_index` ON `oauth_access_tokens` (`user_id`)', undefined);
    }

}
