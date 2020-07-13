import { MigrationInterface, QueryRunner } from 'typeorm';

export class addBranchofficeInvoiceStore1594658255251 implements MigrationInterface {
    name = 'addBranchofficeInvoiceStore1594658255251';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_facturas` ADD `invoiceBranchOfficeSetId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `id_plantel` `invoiceBranchOfficeId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` ADD CONSTRAINT `FK_b4767e0f07c997d12c53911a3a8` FOREIGN KEY (`invoiceBranchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` ADD CONSTRAINT `FK_2dd33c53cdee73463a4c8402ffb` FOREIGN KEY (`invoiceBranchOfficeSetId`) REFERENCES `facturacion_empresas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `tie_facturas` DROP FOREIGN KEY `FK_2dd33c53cdee73463a4c8402ffb`', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` DROP FOREIGN KEY `FK_b4767e0f07c997d12c53911a3a8`', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` CHANGE `invoiceBranchOfficeId` `id_plantel` int NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_facturas` DROP COLUMN `invoiceBranchOfficeSetId`', undefined);
    }

}
