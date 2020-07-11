import {MigrationInterface, QueryRunner} from "typeorm";

export class BranchOfficeEmail1594396213207 implements MigrationInterface {
    name = 'BranchOfficeEmail1594396213207'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `planteles` ADD `email` varchar(255) NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `planteles` ADD `email_user` varchar(255) NULL DEFAULT ''", undefined);
        await queryRunner.query("ALTER TABLE `planteles` ADD `email_pass` varchar(255) NULL DEFAULT ''", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `planteles` DROP COLUMN `email_pass`", undefined);
        await queryRunner.query("ALTER TABLE `planteles` DROP COLUMN `email_user`", undefined);
        await queryRunner.query("ALTER TABLE `planteles` DROP COLUMN `email`", undefined);
    }

}
