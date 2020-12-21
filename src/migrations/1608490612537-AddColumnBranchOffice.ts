import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnBranchOffice1608490612537 implements MigrationInterface {
    name = 'AddColumnBranchOffice1608490612537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `school_charges_invoice` DROP FOREIGN KEY `FK_4e540ea94ad2a651b017899903f`");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` DROP FOREIGN KEY `FK_6e6c825b99b3be244a5e53c105f`");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` DROP COLUMN `agentBillingId`");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` DROP COLUMN `agentCancelingId`");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` ADD `id_agente_facturador` int NULL");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` ADD `id_agente_cancelador` int NULL");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` ADD `invoiceBranchOfficeId` int NULL");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` ADD `invoiceBranchOfficeSetId` int NULL");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` ADD CONSTRAINT `FK_d8bae0d2302d1215baca344176e` FOREIGN KEY (`id_agente_facturador`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` ADD CONSTRAINT `FK_0511798cd2d8a2f0100e6ff0bd7` FOREIGN KEY (`id_agente_cancelador`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` ADD CONSTRAINT `FK_c9cbb579bf574f3c00e3da25e05` FOREIGN KEY (`invoiceBranchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` ADD CONSTRAINT `FK_c6f2032618d7ee82bfcb92b5293` FOREIGN KEY (`invoiceBranchOfficeSetId`) REFERENCES `facturacion_empresas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `school_charges_invoice` DROP FOREIGN KEY `FK_c6f2032618d7ee82bfcb92b5293`");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` DROP FOREIGN KEY `FK_c9cbb579bf574f3c00e3da25e05`");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` DROP FOREIGN KEY `FK_0511798cd2d8a2f0100e6ff0bd7`");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` DROP FOREIGN KEY `FK_d8bae0d2302d1215baca344176e`");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` DROP COLUMN `invoiceBranchOfficeSetId`");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` DROP COLUMN `invoiceBranchOfficeId`");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` DROP COLUMN `id_agente_cancelador`");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` DROP COLUMN `id_agente_facturador`");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` ADD `agentCancelingId` int NULL");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` ADD `agentBillingId` int NULL");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` ADD CONSTRAINT `FK_6e6c825b99b3be244a5e53c105f` FOREIGN KEY (`agentBillingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` ADD CONSTRAINT `FK_4e540ea94ad2a651b017899903f` FOREIGN KEY (`agentCancelingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
