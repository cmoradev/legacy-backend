import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCSD1594835394568 implements MigrationInterface {
    name = 'addCSD1594835394568';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `facturacion_empresas` DROP COLUMN `id_plantel`', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` CHANGE `created_at` `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` CHANGE `updated_at` `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` ADD `version` int NOT NULL DEFAULT 0', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` ADD `uuid` varchar(36) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` CHANGE `certificado_facturacion`  `cer_csd` varchar(100) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` ADD `key_csd` varchar(100) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` ADD `password` varchar(100) NOT NULL', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `facturacion_empresas` DROP COLUMN `password`', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` DROP COLUMN `key_csd`', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` DROP COLUMN `cer_csd`', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` DROP COLUMN `uuid`', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` DROP COLUMN `version`', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` DROP COLUMN `updatedAt`', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` DROP COLUMN `createdAt`', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` ADD `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` ADD `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` ADD `id_plantel` int NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `facturacion_empresas` ADD `certificado_facturacion` varchar(100) CHARACTER SET "utf8" COLLATE "utf8_spanish_ci" NOT NULL', undefined);
    }

}
