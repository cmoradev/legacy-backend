import {MigrationInterface, QueryRunner} from "typeorm";

export class addCreditNoteEntities1633442155463 implements MigrationInterface {
    name = 'addCreditNoteEntities1633442155463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `credit_note_academy` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` timestamp(6) NULL, `folio` varchar(255) NULL, `uuid` varchar(100) NOT NULL, `razon_social` varchar(300) NULL, `rfc` varchar(20) NULL, `total` decimal(15,6) NULL DEFAULT 0.000000, `fecha_cancelacion` timestamp NULL, `motivo_cancelacion` text NULL, `invoiceType` enum ('Income', 'Expenses') NOT NULL DEFAULT 'Expenses', `status` enum ('0', '1', '2', '3', '4') NOT NULL DEFAULT '0', `invoiceBranchOfficeId` int NULL, `agentBillingId` int NULL, `agentCancelingId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `credit_note_school` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` timestamp(6) NULL, `folio` varchar(255) NULL, `uuid` varchar(100) NOT NULL, `razon_social` varchar(300) NULL, `rfc` varchar(20) NULL, `total` decimal(15,6) NULL DEFAULT 0.000000, `fecha_cancelacion` timestamp NULL, `motivo_cancelacion` text NULL, `invoiceType` enum ('Income', 'Expenses') NOT NULL DEFAULT 'Expenses', `status` enum ('0', '1', '2', '3', '4') NOT NULL DEFAULT '0', `invoiceBranchOfficeId` int NULL, `agentBillingId` int NULL, `agentCancelingId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `credit_note_store` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` timestamp(6) NULL, `folio` varchar(255) NULL, `uuid` varchar(100) NOT NULL, `razon_social` varchar(300) NULL, `rfc` varchar(20) NULL, `total` decimal(15,6) NULL DEFAULT 0.000000, `fecha_cancelacion` timestamp NULL, `motivo_cancelacion` text NULL, `invoiceType` enum ('Income', 'Expenses') NOT NULL DEFAULT 'Income', `status` enum ('0', '1', '2', '3', '4') NOT NULL DEFAULT '0', `invoiceBranchOfficeId` int NULL, `agentBillingId` int NULL, `agentCancelingId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tie_products_of_priceslists` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` timestamp(6) NULL, `version` int NOT NULL DEFAULT '0', `uuid` varchar(36) NOT NULL, `precio` decimal(15,6) NULL DEFAULT '0.000000', `precio_con_iva` decimal(15,6) NOT NULL DEFAULT '0.000000', `iva` tinyint(1) NOT NULL, `productId` int NULL, `priceListId` int NULL, `cycleId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `ac_academias` DROP COLUMN `nombre`");
        await queryRunner.query("ALTER TABLE `ac_academias` DROP COLUMN `escolar`");
        await queryRunner.query("ALTER TABLE `ac_facturas` ADD `creditNoteAcademyId` int NULL");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` ADD `creditNotesSchoolId` int NULL");
        await queryRunner.query("ALTER TABLE `tie_facturas` ADD `creditNoteStoreId` int NULL");
        await queryRunner.query("ALTER TABLE `ac_academias` ADD `name` varchar(300) NOT NULL");
        await queryRunner.query("ALTER TABLE `ac_academias` ADD `school` tinyint(1) NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `tie_productos` CHANGE `precio_con_iva` `precio_con_iva` decimal(15,6) NULL DEFAULT '0.000000'");
        await queryRunner.query("ALTER TABLE `ac_aconceptos` DROP COLUMN `id_nivel`");
        await queryRunner.query("ALTER TABLE `ac_aconceptos` ADD `id_nivel` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `credit_note_academy` ADD CONSTRAINT `FK_9716441b94175c0c53e55aa5435` FOREIGN KEY (`invoiceBranchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_academy` ADD CONSTRAINT `FK_4082df5c41fd3e51a3ad237887f` FOREIGN KEY (`agentBillingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_academy` ADD CONSTRAINT `FK_b5f594a7879aa155d9788225ef5` FOREIGN KEY (`agentCancelingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ac_facturas` ADD CONSTRAINT `FK_4c07a86f2e3c6d1358a8b014e93` FOREIGN KEY (`creditNoteAcademyId`) REFERENCES `credit_note_academy`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_school` ADD CONSTRAINT `FK_c6050ef953a7928f246b0b3bdca` FOREIGN KEY (`invoiceBranchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_school` ADD CONSTRAINT `FK_1686ca62243141f815939046705` FOREIGN KEY (`agentBillingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_school` ADD CONSTRAINT `FK_7e4447dea8a1b22f3613b498759` FOREIGN KEY (`agentCancelingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` ADD CONSTRAINT `FK_abe18cd72aacd62ed072bef0e78` FOREIGN KEY (`creditNotesSchoolId`) REFERENCES `credit_note_school`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_store` ADD CONSTRAINT `FK_8f2b1ff08e4ebdfde1e26d8899e` FOREIGN KEY (`invoiceBranchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_store` ADD CONSTRAINT `FK_2c58adce737a3e06db62eaaf56f` FOREIGN KEY (`agentBillingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_store` ADD CONSTRAINT `FK_eb6f286a7155463cf2a457756db` FOREIGN KEY (`agentCancelingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `tie_facturas` ADD CONSTRAINT `FK_c8625c51548604bb996d523af8d` FOREIGN KEY (`creditNoteStoreId`) REFERENCES `credit_note_store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `tie_products_of_priceslists` ADD CONSTRAINT `FK_182991104132376be50cd174242` FOREIGN KEY (`productId`) REFERENCES `tie_productos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `tie_products_of_priceslists` ADD CONSTRAINT `FK_df0cdc820b15dc7c9e85bd5f963` FOREIGN KEY (`priceListId`) REFERENCES `tie_listaprecios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `tie_products_of_priceslists` ADD CONSTRAINT `FK_4058a9c5add62f962daed217e0e` FOREIGN KEY (`cycleId`) REFERENCES `ciclos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_products_of_priceslists` DROP FOREIGN KEY `FK_4058a9c5add62f962daed217e0e`");
        await queryRunner.query("ALTER TABLE `tie_products_of_priceslists` DROP FOREIGN KEY `FK_df0cdc820b15dc7c9e85bd5f963`");
        await queryRunner.query("ALTER TABLE `tie_products_of_priceslists` DROP FOREIGN KEY `FK_182991104132376be50cd174242`");
        await queryRunner.query("ALTER TABLE `tie_facturas` DROP FOREIGN KEY `FK_c8625c51548604bb996d523af8d`");
        await queryRunner.query("ALTER TABLE `credit_note_store` DROP FOREIGN KEY `FK_eb6f286a7155463cf2a457756db`");
        await queryRunner.query("ALTER TABLE `credit_note_store` DROP FOREIGN KEY `FK_2c58adce737a3e06db62eaaf56f`");
        await queryRunner.query("ALTER TABLE `credit_note_store` DROP FOREIGN KEY `FK_8f2b1ff08e4ebdfde1e26d8899e`");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` DROP FOREIGN KEY `FK_abe18cd72aacd62ed072bef0e78`");
        await queryRunner.query("ALTER TABLE `credit_note_school` DROP FOREIGN KEY `FK_7e4447dea8a1b22f3613b498759`");
        await queryRunner.query("ALTER TABLE `credit_note_school` DROP FOREIGN KEY `FK_1686ca62243141f815939046705`");
        await queryRunner.query("ALTER TABLE `credit_note_school` DROP FOREIGN KEY `FK_c6050ef953a7928f246b0b3bdca`");
        await queryRunner.query("ALTER TABLE `ac_facturas` DROP FOREIGN KEY `FK_4c07a86f2e3c6d1358a8b014e93`");
        await queryRunner.query("ALTER TABLE `credit_note_academy` DROP FOREIGN KEY `FK_b5f594a7879aa155d9788225ef5`");
        await queryRunner.query("ALTER TABLE `credit_note_academy` DROP FOREIGN KEY `FK_4082df5c41fd3e51a3ad237887f`");
        await queryRunner.query("ALTER TABLE `credit_note_academy` DROP FOREIGN KEY `FK_9716441b94175c0c53e55aa5435`");
        await queryRunner.query("ALTER TABLE `ac_aconceptos` DROP COLUMN `id_nivel`");
        await queryRunner.query("ALTER TABLE `ac_aconceptos` ADD `id_nivel` varchar(45) NULL");
        await queryRunner.query("ALTER TABLE `tie_productos` CHANGE `precio_con_iva` `precio_con_iva` decimal(15,6) NOT NULL DEFAULT '0.000000'");
        await queryRunner.query("ALTER TABLE `ac_academias` DROP COLUMN `school`");
        await queryRunner.query("ALTER TABLE `ac_academias` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `tie_facturas` DROP COLUMN `creditNoteStoreId`");
        await queryRunner.query("ALTER TABLE `school_charges_invoice` DROP COLUMN `creditNotesSchoolId`");
        await queryRunner.query("ALTER TABLE `ac_facturas` DROP COLUMN `creditNoteAcademyId`");
        await queryRunner.query("ALTER TABLE `ac_academias` ADD `escolar` tinyint(1) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `ac_academias` ADD `nombre` varchar(300) NOT NULL");
        await queryRunner.query("DROP TABLE `tie_products_of_priceslists`");
        await queryRunner.query("DROP TABLE `credit_note_store`");
        await queryRunner.query("DROP TABLE `credit_note_school`");
        await queryRunner.query("DROP TABLE `credit_note_academy`");
    }

}
