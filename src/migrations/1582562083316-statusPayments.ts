import {MigrationInterface, QueryRunner} from "typeorm";

export class statusPayments1582562083316 implements MigrationInterface {
    name = 'statusPayments1582562083316'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school_payment` ADD `statusPayment` enum ('1', '2', '3', '4', '5') NOT NULL DEFAULT '1'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `school_payment` DROP COLUMN `statusPayment`", undefined);
    }

}
