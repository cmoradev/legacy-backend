import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedLogoColumnToCompanyEntity1585266939081 implements MigrationInterface {
    name = 'AddedLogoColumnToCompanyEntity1585266939081';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `company` ADD `logo` text NOT NULL', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `company` DROP COLUMN `logo`', undefined);
    }

}
