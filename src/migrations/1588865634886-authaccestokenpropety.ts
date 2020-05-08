import { MigrationInterface, QueryRunner } from 'typeorm';

export class authaccestokenpropety1588865634886 implements MigrationInterface {
    name = 'authaccestokenpropety1588865634886';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` ADD `jwt` text NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` ADD `isActive` tinyint NOT NULL', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` DROP COLUMN `isActive`', undefined);
        await queryRunner.query('ALTER TABLE `oauth_access_tokens` DROP COLUMN `jwt`', undefined);
    }

}
