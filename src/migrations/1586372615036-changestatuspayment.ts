import {MigrationInterface, QueryRunner} from "typeorm";

export class changestatuspayment1586372615036 implements MigrationInterface {
    name = 'changestatuspayment1586372615036'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school_charge_payments` DROP FOREIGN KEY `FK_a816d2d085420d8d9b580594b11`", undefined);
        await queryRunner.query("ALTER TABLE `tie_transaction` CHANGE `folio` `folio` varchar(40) NOT NULL DEFAULT 000000000000000", undefined);
        await queryRunner.query("ALTER TABLE `school_charge_payments` CHANGE `paymentStatusId` `paymentStatusId` enum ('1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '1'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school_charge_payments` DROP COLUMN `paymentStatusId`", undefined);
        await queryRunner.query("ALTER TABLE `school_charge_payments` ADD `paymentStatusId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `tie_transaction` CHANGE `folio` `folio` varchar(40) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `school_charge_payments` ADD CONSTRAINT `FK_a816d2d085420d8d9b580594b11` FOREIGN KEY (`paymentStatusId`) REFERENCES `estado_pagos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
