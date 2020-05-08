import {MigrationInterface, QueryRunner} from "typeorm";

export class FoliosInvoiceCompany1588813079579 implements MigrationInterface {
    name = 'FoliosInvoiceCompany1588813079579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `facturacion_empresas` ADD `foliaje_pago` varchar(10) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `facturacion_empresas` ADD `serie_nota` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `facturacion_empresas` ADD `serie_factura` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `facturacion_empresas` ADD `serie_pago` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `facturacion_empresas` ADD `id_modalidad` enum ('1', '2', '3') NOT NULL DEFAULT '3'", undefined);
        await queryRunner.query("ALTER TABLE `facturacion_empresas` ADD `invoiceCampusId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `facturacion_empresas` ADD CONSTRAINT `FK_9654abef9e99a4782c7bfc8757f` FOREIGN KEY (`invoiceCampusId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `facturacion_empresas` DROP FOREIGN KEY `FK_9654abef9e99a4782c7bfc8757f`", undefined);
        await queryRunner.query("ALTER TABLE `facturacion_empresas` DROP COLUMN `invoiceCampusId`", undefined);
        await queryRunner.query("ALTER TABLE `facturacion_empresas` DROP COLUMN `id_modalidad`", undefined);
        await queryRunner.query("ALTER TABLE `facturacion_empresas` DROP COLUMN `serie_pago`", undefined);
        await queryRunner.query("ALTER TABLE `facturacion_empresas` DROP COLUMN `serie_factura`", undefined);
        await queryRunner.query("ALTER TABLE `facturacion_empresas` DROP COLUMN `serie_nota`", undefined);
        await queryRunner.query("ALTER TABLE `facturacion_empresas` DROP COLUMN `foliaje_pago`", undefined);
    }

}
