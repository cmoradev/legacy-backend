import {MigrationInterface, QueryRunner} from "typeorm";

export class addcolumoperation1581620086482 implements MigrationInterface {
    name = 'addcolumoperation1581620086482'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ac_descuentos` ADD `operation` enum ('sum', 'subtraction', 'division', 'multiplication') NOT NULL DEFAULT 'sum'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ac_descuentos` DROP COLUMN `operation`", undefined);
    }

}
