import {MigrationInterface, QueryRunner} from "typeorm";

export class branchOfficeOrderPrefix1593026458826 implements MigrationInterface {
    name = 'branchOfficeOrderPrefix1593026458826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `planteles` ADD `folio_order` int NOT NULL DEFAULT 1", undefined);
        await queryRunner.query("ALTER TABLE `planteles` ADD `prefix_order` varchar(255) NOT NULL DEFAULT ''", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `planteles` DROP COLUMN `prefix_order`", undefined);
        await queryRunner.query("ALTER TABLE `planteles` DROP COLUMN `folio_order`", undefined);
    }

}
