import {MigrationInterface, QueryRunner} from "typeorm";

export class SchoolPaymentDates1582521284865 implements MigrationInterface {
    name = 'SchoolPaymentDates1582521284865'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school_payment` ADD `payMonth` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` ADD `paidMonth` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` ADD `paidDate` date NULL", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` ADD `payDate` date NULL", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` DROP COLUMN `payDay`", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` ADD `payDay` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` DROP COLUMN `paidDay`", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` ADD `paidDay` int NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school_payment` DROP COLUMN `paidDay`", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` ADD `paidDay` date NULL", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` DROP COLUMN `payDay`", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` ADD `payDay` date NULL", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` DROP COLUMN `payDate`", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` DROP COLUMN `paidDate`", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` DROP COLUMN `paidMonth`", undefined);
        await queryRunner.query("ALTER TABLE `school_payment` DROP COLUMN `payMonth`", undefined);
    }

}
