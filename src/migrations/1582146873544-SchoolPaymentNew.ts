import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchoolPaymentNew1582146873544 implements MigrationInterface {
    name = 'SchoolPaymentNew1582146873544';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `school_payment` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `version` int NOT NULL DEFAULT 0, `uuid` varchar(36) NOT NULL, `productCode` varchar(20) NOT NULL, `unitCode` varchar(20) NOT NULL, `unit` varchar(100) NULL, `description` varchar(250) NULL, `quantity` int NOT NULL DEFAULT 1, `payDay` date NULL, `price` decimal(15,6) NULL DEFAULT 0.000000, `withIva` tinyint NOT NULL DEFAULT 1, `iva` decimal(15,6) NOT NULL DEFAULT 0.000000, `isActive` tinyint NOT NULL DEFAULT 1, `schoolChargeDetailId` int NULL, `inscriptionsId` int NULL, UNIQUE INDEX `REL_1ad935791cba586dc0fea1f7e7` (`schoolChargeDetailId`), PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);
        await queryRunner.query('ALTER TABLE `school_charge_payments` CHANGE `folio` `folio` varchar(45) NOT NULL DEFAULT 000000000000000', undefined);
        await queryRunner.query('ALTER TABLE `school_payment` ADD CONSTRAINT `FK_1ad935791cba586dc0fea1f7e73` FOREIGN KEY (`schoolChargeDetailId`) REFERENCES `school_charges_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
        await queryRunner.query('ALTER TABLE `school_payment` ADD CONSTRAINT `FK_7c290d55bb64314f8e75eba0f01` FOREIGN KEY (`inscriptionsId`) REFERENCES `inscripciones`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `school_payment` DROP FOREIGN KEY `FK_7c290d55bb64314f8e75eba0f01`', undefined);
        await queryRunner.query('ALTER TABLE `school_payment` DROP FOREIGN KEY `FK_1ad935791cba586dc0fea1f7e73`', undefined);
        await queryRunner.query('ALTER TABLE `school_charge_payments` CHANGE `folio` `folio` varchar(45) NOT NULL DEFAULT \'0\'', undefined);
        await queryRunner.query('DROP INDEX `REL_1ad935791cba586dc0fea1f7e7` ON `school_payment`', undefined);
        await queryRunner.query('DROP TABLE `school_payment`', undefined);
    }

}
