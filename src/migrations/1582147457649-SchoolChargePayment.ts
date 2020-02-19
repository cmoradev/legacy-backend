import {MigrationInterface, QueryRunner} from "typeorm";

export class SchoolChargePayment1582147457649 implements MigrationInterface {
    name = 'SchoolChargePayment1582147457649'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school_charge_payments` CHANGE `folio` `folio` varchar(45) NOT NULL DEFAULT '000000000000000'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school_charge_payments` CHANGE `folio` `folio` varchar(45) NOT NULL DEFAULT '0'", undefined);
    }

}
