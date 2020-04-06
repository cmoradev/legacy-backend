import {MigrationInterface, QueryRunner} from "typeorm";

export class addfolio1586191426913 implements MigrationInterface {
    name = 'addfolio1586191426913'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_transaction` ADD `folio` varchar(40) NOT NULL DEFAULT 000000000000000", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tie_transaction` DROP COLUMN `folio`", undefined);
    }

}
