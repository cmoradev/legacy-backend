import {MigrationInterface, QueryRunner} from "typeorm";

export class addbranchofficeinvoiceacademy1597422394882 implements MigrationInterface {
    name = 'addbranchofficeinvoiceacademy1597422394882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ac_facturas` ADD `invoiceBranchOfficeSetId` int NULL");
        await queryRunner.query("ALTER TABLE `ac_facturas` CHANGE `id_plantel` `invoiceBranchOfficeId` int NULL");
        await queryRunner.query("ALTER TABLE `ac_facturas` ADD CONSTRAINT `FK_48b1d2ec14972fe5ad137248fb4` FOREIGN KEY (`invoiceBranchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ac_facturas` ADD CONSTRAINT `FK_d7c45f20240f0757473c4254d7c` FOREIGN KEY (`invoiceBranchOfficeSetId`) REFERENCES `facturacion_empresas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ac_facturas` DROP FOREIGN KEY `FK_d7c45f20240f0757473c4254d7c`");
        await queryRunner.query("ALTER TABLE `ac_facturas` DROP FOREIGN KEY `FK_48b1d2ec14972fe5ad137248fb4`");
        await queryRunner.query("ALTER TABLE `ac_facturas` CHANGE `id_plantel` `id_plantel` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `ac_facturas` DROP COLUMN `invoiceBranchOfficeSetId`");
    }

}
