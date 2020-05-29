import {MigrationInterface, QueryRunner} from "typeorm";

export class branchTypeField1590613560893 implements MigrationInterface {
    name = 'branchTypeField1590613560893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `planteles` ADD `branch_type` enum ('1', '2') NOT NULL DEFAULT '1'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `planteles` DROP COLUMN `branch_type`", undefined);
    }

}
