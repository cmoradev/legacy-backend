import { MigrationInterface, QueryRunner } from 'typeorm';

export class familyBusinessNamr1593442752529 implements MigrationInterface {
    name = 'familyBusinessNamr1593442752529';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `familia_infofiscal` CHANGE `created_at` `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)', undefined);
        await queryRunner.query('ALTER TABLE `familia_infofiscal` CHANGE `updated_at` `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)', undefined);
        await queryRunner.query('ALTER TABLE `familia_infofiscal` ADD `version` int NOT NULL DEFAULT 0', undefined);
        await queryRunner.query('ALTER TABLE `familia_infofiscal` ADD `uuid` varchar(36) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `familia_infofiscal` CHANGE `id_regimen` `id_regimen` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `familia_infofiscal` CHANGE `id_familia` `id_familia` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `familia_infofiscal` ADD CONSTRAINT `FK_69f3ff883a25be470245b0d7fa1` FOREIGN KEY (`id_familia`) REFERENCES `familias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `familia_infofiscal` DROP FOREIGN KEY `FK_69f3ff883a25be470245b0d7fa1`', undefined);
        await queryRunner.query('ALTER TABLE `familia_infofiscal` CHANGE `id_familia` `id_familia` int NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `familia_infofiscal` CHANGE `id_regimen` `id_regimen` int(50) NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `familia_infofiscal` DROP COLUMN `uuid`', undefined);
        await queryRunner.query('ALTER TABLE `familia_infofiscal` DROP COLUMN `version`', undefined);
        await queryRunner.query('ALTER TABLE `familia_infofiscal` CHANGE `updatedAt` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', undefined);
        await queryRunner.query('ALTER TABLE `familia_infofiscal` CHANGE `createdAt` `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
    }

}
