import {MigrationInterface, QueryRunner} from "typeorm";

export class removeoperation1581619895129 implements MigrationInterface {
    name = 'removeoperation1581619895129'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ac_descuentos` DROP COLUMN `operation`", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `ac_descuentos` ADD `operation` enum ('suma', 'subtraction', 'division', 'multiplication') CHARACTER SET \"utf8\" COLLATE \"utf8_spanish_ci\" NOT NULL DEFAULT 'suma'", undefined);
    }

}
