import { MigrationInterface, QueryRunner } from 'typeorm';

export class charges1582070206799 implements MigrationInterface {
    name = 'charges1582070206799';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `school_charges_details` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `codeConcept` varchar(255) NOT NULL, `codeUnit` varchar(255) NULL, `unidad` varchar(255) NULL, `concept` varchar(255) NOT NULL, `quantity` int NOT NULL, `price` decimal(15,6) NOT NULL DEFAULT 0.000000, `schoolChargeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `school-charges-invoice` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `folio` varchar(255) NULL, `businessName` varchar(300) NULL, `rfc` varchar(20) NULL, `total` decimal(15,6) NULL DEFAULT 0.000000, `fecha_cancelacion` timestamp NULL, `motivo_cancelacion` text NULL, `status` tinyint NOT NULL DEFAULT 1, `id_plantel` int NOT NULL DEFAULT 0, `invoiceType` enum (\'Income\', \'Expenses\') NOT NULL DEFAULT \'Income\', `schoolChargePaymentId` int NULL, `schoolChargeId` int NULL, `agentBillingId` int NULL, `agentCancelingId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `school_charges` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `folio` varchar(40) NOT NULL DEFAULT \'000000000000000\', `observations` text NULL, `dateCancellation` timestamp NULL, `reasonsCancellation` text NULL, `iva` int NOT NULL, `change` decimal(15,6) NOT NULL DEFAULT 0.000000, `schoolCampusId` int NULL, `schoolCycleId` int NULL, `cashierId` int NULL, `cashierCancellationId` int NULL, `schoolStudentId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `school_charge_payments` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `folio` varchar(45) NOT NULL DEFAULT 000000000000000, `change` decimal(15,6) NULL DEFAULT 0.000000, `quantity` decimal(15,6) NOT NULL DEFAULT 0.000000, `dateCancellation` timestamp NULL, `reasonCancellation` text NULL, `observations` text NULL, `stamping` tinyint(1) NOT NULL DEFAULT 0, `isIVA` tinyint(1) NOT NULL DEFAULT 1, `schoolChargeId` int NULL, `paymentStatusId` int NULL, `cashierChargeId` int NULL, `cashierChargeCancellationId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `school-charges-methods-payments` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `codePaymentMethod` varchar(10) NOT NULL, `quantity` decimal(15,6) NOT NULL DEFAULT 0.000000, `date` date NULL, `account` varchar(255) NULL, `bankId` int NULL, `invoiceMethodPaymentId` int NULL, `schoolChargePaymentId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `school_charges_details` ADD CONSTRAINT `FK_38fb154cccc3812e90710d7e9d7` FOREIGN KEY (`schoolChargeId`) REFERENCES `school_charges`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school-charges-invoice` ADD CONSTRAINT `FK_0fb9bc8178922ec3d9f7d1ee011` FOREIGN KEY (`schoolChargePaymentId`) REFERENCES `school_charge_payments`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school-charges-invoice` ADD CONSTRAINT `FK_595901634daa74c375c806e9aff` FOREIGN KEY (`schoolChargeId`) REFERENCES `school_charges`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school-charges-invoice` ADD CONSTRAINT `FK_4031ba5227eb63df6a0f49b427d` FOREIGN KEY (`agentBillingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school-charges-invoice` ADD CONSTRAINT `FK_0d5770332418cc43cd0ae7710e6` FOREIGN KEY (`agentCancelingId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school_charges` ADD CONSTRAINT `FK_bf9709f87f1c8beac073eac99f1` FOREIGN KEY (`schoolCampusId`) REFERENCES `planteles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school_charges` ADD CONSTRAINT `FK_ff53c6dd1745f0e7818a4920299` FOREIGN KEY (`schoolCycleId`) REFERENCES `ciclos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school_charges` ADD CONSTRAINT `FK_2d2365475cf340c58dd4759aa02` FOREIGN KEY (`cashierId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school_charges` ADD CONSTRAINT `FK_043cdd8064a419ade3e728330c7` FOREIGN KEY (`cashierCancellationId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school_charges` ADD CONSTRAINT `FK_2070d3d865a0fe75ccfefe78103` FOREIGN KEY (`schoolStudentId`) REFERENCES `alumnos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school_charge_payments` ADD CONSTRAINT `FK_ae5f9d76ae3fbba0211a912971b` FOREIGN KEY (`schoolChargeId`) REFERENCES `school_charges`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school_charge_payments` ADD CONSTRAINT `FK_a816d2d085420d8d9b580594b11` FOREIGN KEY (`paymentStatusId`) REFERENCES `estado_pagos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school_charge_payments` ADD CONSTRAINT `FK_50096d2693db9043c4dd3bceb26` FOREIGN KEY (`cashierChargeId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school_charge_payments` ADD CONSTRAINT `FK_42fd8646eb5fbe512fb9bb3de7a` FOREIGN KEY (`cashierChargeCancellationId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school-charges-methods-payments` ADD CONSTRAINT `FK_4f8d215351cbd2856917f105f8d` FOREIGN KEY (`bankId`) REFERENCES `facturacion_bancos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school-charges-methods-payments` ADD CONSTRAINT `FK_57e74a76e028749f5e6bfba84ce` FOREIGN KEY (`invoiceMethodPaymentId`) REFERENCES `facturacion_formas_pago`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school-charges-methods-payments` ADD CONSTRAINT `FK_cbded12ba86e574162ffac84adc` FOREIGN KEY (`schoolChargePaymentId`) REFERENCES `school_charge_payments`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `school-charges-methods-payments` DROP FOREIGN KEY `FK_cbded12ba86e574162ffac84adc`', undefined);
        await queryRunner.query('ALTER TABLE `school-charges-methods-payments` DROP FOREIGN KEY `FK_57e74a76e028749f5e6bfba84ce`', undefined);
        await queryRunner.query('ALTER TABLE `school-charges-methods-payments` DROP FOREIGN KEY `FK_4f8d215351cbd2856917f105f8d`', undefined);
        await queryRunner.query('ALTER TABLE `school_charge_payments` DROP FOREIGN KEY `FK_42fd8646eb5fbe512fb9bb3de7a`', undefined);
        await queryRunner.query('ALTER TABLE `school_charge_payments` DROP FOREIGN KEY `FK_50096d2693db9043c4dd3bceb26`', undefined);
        await queryRunner.query('ALTER TABLE `school_charge_payments` DROP FOREIGN KEY `FK_a816d2d085420d8d9b580594b11`', undefined);
        await queryRunner.query('ALTER TABLE `school_charge_payments` DROP FOREIGN KEY `FK_ae5f9d76ae3fbba0211a912971b`', undefined);
        await queryRunner.query('ALTER TABLE `school_charges` DROP FOREIGN KEY `FK_2070d3d865a0fe75ccfefe78103`', undefined);
        await queryRunner.query('ALTER TABLE `school_charges` DROP FOREIGN KEY `FK_043cdd8064a419ade3e728330c7`', undefined);
        await queryRunner.query('ALTER TABLE `school_charges` DROP FOREIGN KEY `FK_2d2365475cf340c58dd4759aa02`', undefined);
        await queryRunner.query('ALTER TABLE `school_charges` DROP FOREIGN KEY `FK_ff53c6dd1745f0e7818a4920299`', undefined);
        await queryRunner.query('ALTER TABLE `school_charges` DROP FOREIGN KEY `FK_bf9709f87f1c8beac073eac99f1`', undefined);
        await queryRunner.query('ALTER TABLE `school-charges-invoice` DROP FOREIGN KEY `FK_0d5770332418cc43cd0ae7710e6`', undefined);
        await queryRunner.query('ALTER TABLE `school-charges-invoice` DROP FOREIGN KEY `FK_4031ba5227eb63df6a0f49b427d`', undefined);
        await queryRunner.query('ALTER TABLE `school-charges-invoice` DROP FOREIGN KEY `FK_595901634daa74c375c806e9aff`', undefined);
        await queryRunner.query('ALTER TABLE `school-charges-invoice` DROP FOREIGN KEY `FK_0fb9bc8178922ec3d9f7d1ee011`', undefined);
        await queryRunner.query('ALTER TABLE `school_charges_details` DROP FOREIGN KEY `FK_38fb154cccc3812e90710d7e9d7`', undefined);
        await queryRunner.query('DROP TABLE `school-charges-methods-payments`', undefined);
        await queryRunner.query('DROP TABLE `school_charge_payments`', undefined);
        await queryRunner.query('DROP TABLE `school_charges`', undefined);
        await queryRunner.query('DROP TABLE `school-charges-invoice`', undefined);
        await queryRunner.query('DROP TABLE `school_charges_details`', undefined);
    }

}
