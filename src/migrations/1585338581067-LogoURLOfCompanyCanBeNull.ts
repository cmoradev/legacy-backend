import { MigrationInterface, QueryRunner } from 'typeorm';

export class LogoURLOfCompanyCanBeNull1585338581067 implements MigrationInterface {
    name = 'LogoURLOfCompanyCanBeNull1585338581067';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `periods` CHANGE `isActive` `isActive` tinyint NOT NULL DEFAULT 1', undefined);
        await queryRunner.query('ALTER TABLE `company` CHANGE `logo` `logo` text NULL', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `company` CHANGE `logo` `logo` text NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `periods` CHANGE `isActive` `isActive` tinyint(1) NOT NULL DEFAULT \'1\'', undefined);
    }

}
