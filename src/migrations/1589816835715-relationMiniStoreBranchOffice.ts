import { MigrationInterface, QueryRunner } from 'typeorm';

export class relationMiniStoreBranchOffice1589816835715 implements MigrationInterface {
    name = 'relationMiniStoreBranchOffice1589816835715';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `created_at` `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `updated_at` `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` ADD `version` int NOT NULL DEFAULT 0', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` DROP FOREIGN KEY `FK_0cb46f1027849829a0a3d77383c`', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `id_plantel` `storeBranchOfficeId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `ciclo` `cycleId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` ADD CONSTRAINT `FK_4e71c0dde452c577095320c1b03` FOREIGN KEY (`storeBranchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` ADD CONSTRAINT `FK_0cb46f1027849829a0a3d77383c` FOREIGN KEY (`cycleId`) REFERENCES `ciclos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_ventas` DROP FOREIGN KEY `FK_0cb46f1027849829a0a3d77383c`', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` DROP FOREIGN KEY `FK_4e71c0dde452c577095320c1b03`', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `cycleId` `ciclo` int NOT NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `storeBranchOfficeId` `id_plantel` int NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` ADD CONSTRAINT `FK_0cb46f1027849829a0a3d77383c` FOREIGN KEY (`ciclo`) REFERENCES `ciclos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` DROP COLUMN `version`', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `updatedAt` `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', undefined);
        await queryRunner.query('ALTER TABLE `tie_ventas` CHANGE `createdAt` `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP', undefined);
    }

}
