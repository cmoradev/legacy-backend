import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedCashRegisterAndTransactions1586187724399 implements MigrationInterface {
    name = 'AddedCashRegisterAndTransactions1586187724399';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `cash_register` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(36) NOT NULL, `openAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `closedAt` timestamp NULL, `version` int NOT NULL DEFAULT 0, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `agentId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('CREATE TABLE `cash_register_transactions` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(36) NOT NULL, `transactionType` enum (\'Income\', \'Expenses\', \'MoneyOut\') NOT NULL DEFAULT \'Income\', `version` int NOT NULL DEFAULT 0, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `agentId` int NOT NULL, `paymentId` int NULL, `cashRegisterId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `tie_transaction` ADD `cashRegisterId` int NULL', undefined);
        await queryRunner.query('ALTER TABLE `tie_transaction` CHANGE `transactionType` `transactionType` enum (\'Income\', \'Expenses\', \'MoneyOut\') NOT NULL DEFAULT \'Income\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_transaction` ADD CONSTRAINT `FK_47c8ad9d654cf01fd2ed79d672b` FOREIGN KEY (`cashRegisterId`) REFERENCES `cash_register`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `cash_register` ADD CONSTRAINT `FK_5ceaa5efa1b69829c847f54ed4c` FOREIGN KEY (`agentId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `cash_register_transactions` ADD CONSTRAINT `FK_07d6528b37a45db954b9d9d0c8f` FOREIGN KEY (`agentId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `cash_register_transactions` ADD CONSTRAINT `FK_72582dcaeab4532d0bb21c3041f` FOREIGN KEY (`paymentId`) REFERENCES `tie_venta_pagos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `cash_register_transactions` ADD CONSTRAINT `FK_1fe3849b5d8bf8383933d2de12c` FOREIGN KEY (`cashRegisterId`) REFERENCES `cash_register`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `cash_register_transactions` DROP FOREIGN KEY `FK_1fe3849b5d8bf8383933d2de12c`', undefined);
        await queryRunner.query('ALTER TABLE `cash_register_transactions` DROP FOREIGN KEY `FK_72582dcaeab4532d0bb21c3041f`', undefined);
        await queryRunner.query('ALTER TABLE `cash_register_transactions` DROP FOREIGN KEY `FK_07d6528b37a45db954b9d9d0c8f`', undefined);
        await queryRunner.query('ALTER TABLE `cash_register` DROP FOREIGN KEY `FK_5ceaa5efa1b69829c847f54ed4c`', undefined);
        await queryRunner.query('ALTER TABLE `tie_transaction` DROP FOREIGN KEY `FK_47c8ad9d654cf01fd2ed79d672b`', undefined);
        await queryRunner.query('ALTER TABLE `tie_transaction` CHANGE `transactionType` `transactionType` enum (\'income\', \'expenses\', \'moneyOut\') NOT NULL DEFAULT \'income\'', undefined);
        await queryRunner.query('ALTER TABLE `tie_transaction` DROP COLUMN `cashRegisterId`', undefined);
        await queryRunner.query('DROP TABLE `cash_register_transactions`', undefined);
        await queryRunner.query('DROP TABLE `cash_register`', undefined);
    }

}
