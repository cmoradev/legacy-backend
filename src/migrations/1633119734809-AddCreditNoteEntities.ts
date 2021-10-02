import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreditNoteEntities1633119734809 implements MigrationInterface {
    name = 'AddCreditNoteEntities1633119734809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `credit_note_academy` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` timestamp(6) NULL, `folio` varchar(255) NULL, `uuid` varchar(100) NOT NULL, `razon_social` varchar(300) NULL, `rfc` varchar(20) NULL, `total` decimal(15,6) NULL DEFAULT 0.000000, `fecha_cancelacion` timestamp NULL, `motivo_cancelacion` text NULL, `invoiceType` enum ('Income', 'Expenses') NOT NULL DEFAULT 'Expenses', `status` enum ('0', '1', '2', '3', '4') NOT NULL DEFAULT '0', `invoiceBranchOfficeId` int NULL, `agentBillingId` int NULL, `agentCancelingId` int NULL, `invoicesAcademyId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `credit_note_school` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` timestamp(6) NULL, `folio` varchar(255) NULL, `uuid` varchar(100) NOT NULL, `razon_social` varchar(300) NULL, `rfc` varchar(20) NULL, `total` decimal(15,6) NULL DEFAULT 0.000000, `fecha_cancelacion` timestamp NULL, `motivo_cancelacion` text NULL, `invoiceType` enum ('Income', 'Expenses') NOT NULL DEFAULT 'Expenses', `status` enum ('0', '1', '2', '3', '4') NOT NULL DEFAULT '0', `invoiceBranchOfficeId` int NULL, `agentBillingId` int NULL, `agentCancelingId` int NULL, `invoiceSchoolId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `credit_note_store` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` timestamp(6) NULL, `folio` varchar(255) NULL, `uuid` varchar(100) NOT NULL, `razon_social` varchar(300) NULL, `rfc` varchar(20) NULL, `total` decimal(15,6) NULL DEFAULT 0.000000, `fecha_cancelacion` timestamp NULL, `motivo_cancelacion` text NULL, `invoiceType` enum ('Income', 'Expenses') NOT NULL DEFAULT 'Income', `status` enum ('0', '1', '2', '3', '4') NOT NULL DEFAULT '0', `invoiceBranchOfficeId` int NULL, `agentBillingId` int NULL, `agentCancelingId` int NULL, `invoiceStoreId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `credit_note_academy` ADD CONSTRAINT `FK_9716441b94175c0c53e55aa5435` FOREIGN KEY (`invoiceBranchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_academy` ADD CONSTRAINT `FK_4082df5c41fd3e51a3ad237887f` FOREIGN KEY (`agentBillingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_academy` ADD CONSTRAINT `FK_b5f594a7879aa155d9788225ef5` FOREIGN KEY (`agentCancelingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_academy` ADD CONSTRAINT `FK_826aa2df765af726ca628db2f63` FOREIGN KEY (`invoicesAcademyId`) REFERENCES `ac_facturas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_school` ADD CONSTRAINT `FK_c6050ef953a7928f246b0b3bdca` FOREIGN KEY (`invoiceBranchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_school` ADD CONSTRAINT `FK_1686ca62243141f815939046705` FOREIGN KEY (`agentBillingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_school` ADD CONSTRAINT `FK_7e4447dea8a1b22f3613b498759` FOREIGN KEY (`agentCancelingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_school` ADD CONSTRAINT `FK_c95076b63a193e21b7193b005c0` FOREIGN KEY (`invoiceSchoolId`) REFERENCES `school_charges_invoice`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_store` ADD CONSTRAINT `FK_8f2b1ff08e4ebdfde1e26d8899e` FOREIGN KEY (`invoiceBranchOfficeId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_store` ADD CONSTRAINT `FK_2c58adce737a3e06db62eaaf56f` FOREIGN KEY (`agentBillingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_store` ADD CONSTRAINT `FK_eb6f286a7155463cf2a457756db` FOREIGN KEY (`agentCancelingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `credit_note_store` ADD CONSTRAINT `FK_269e1257e3ca255b36502c4675b` FOREIGN KEY (`invoiceStoreId`) REFERENCES `tie_facturas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `credit_note_store` DROP FOREIGN KEY `FK_269e1257e3ca255b36502c4675b`");
        await queryRunner.query("ALTER TABLE `credit_note_store` DROP FOREIGN KEY `FK_eb6f286a7155463cf2a457756db`");
        await queryRunner.query("ALTER TABLE `credit_note_store` DROP FOREIGN KEY `FK_2c58adce737a3e06db62eaaf56f`");
        await queryRunner.query("ALTER TABLE `credit_note_store` DROP FOREIGN KEY `FK_8f2b1ff08e4ebdfde1e26d8899e`");
        await queryRunner.query("ALTER TABLE `credit_note_school` DROP FOREIGN KEY `FK_c95076b63a193e21b7193b005c0`");
        await queryRunner.query("ALTER TABLE `credit_note_school` DROP FOREIGN KEY `FK_7e4447dea8a1b22f3613b498759`");
        await queryRunner.query("ALTER TABLE `credit_note_school` DROP FOREIGN KEY `FK_1686ca62243141f815939046705`");
        await queryRunner.query("ALTER TABLE `credit_note_school` DROP FOREIGN KEY `FK_c6050ef953a7928f246b0b3bdca`");
        await queryRunner.query("ALTER TABLE `credit_note_academy` DROP FOREIGN KEY `FK_826aa2df765af726ca628db2f63`");
        await queryRunner.query("ALTER TABLE `credit_note_academy` DROP FOREIGN KEY `FK_b5f594a7879aa155d9788225ef5`");
        await queryRunner.query("ALTER TABLE `credit_note_academy` DROP FOREIGN KEY `FK_4082df5c41fd3e51a3ad237887f`");
        await queryRunner.query("ALTER TABLE `credit_note_academy` DROP FOREIGN KEY `FK_9716441b94175c0c53e55aa5435`");
        await queryRunner.query("DROP TABLE `credit_note_store`");
        await queryRunner.query("DROP TABLE `credit_note_school`");
        await queryRunner.query("DROP TABLE `credit_note_academy`");
    }

}
