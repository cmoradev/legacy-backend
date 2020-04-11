import {MigrationInterface, QueryRunner} from "typeorm";

export class addStatusSchoolCharge1586574779047 implements MigrationInterface {
    name = 'addStatusSchoolCharge1586574779047'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `FK_a816d2d085420d8d9b580594b11` ON `school_charge_payments`", undefined);
        await queryRunner.query("ALTER TABLE `school_charges` ADD `status` enum ('1', '2', '3', '4', '5', '6') NOT NULL DEFAULT '1'", undefined);
        await queryRunner.query("ALTER TABLE `tie_transaction` CHANGE `folio` `folio` varchar(40) NOT NULL DEFAULT 000000000000000", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_transaction` CHANGE `folio` `folio` varchar(40) NOT NULL DEFAULT '0'", undefined);
        await queryRunner.query("ALTER TABLE `school_charges` DROP COLUMN `status`", undefined);
        await queryRunner.query("CREATE INDEX `FK_a816d2d085420d8d9b580594b11` ON `school_charge_payments` (`paymentStatusId`)", undefined);
    }

}
