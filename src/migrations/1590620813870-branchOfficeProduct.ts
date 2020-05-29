import {MigrationInterface, QueryRunner} from "typeorm";

export class branchOfficeProduct1590620813870 implements MigrationInterface {
    name = 'branchOfficeProduct1590620813870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `planteles` CHANGE `branch_type` `branch_type` enum ('1', '2') NOT NULL DEFAULT '1'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `planteles` CHANGE `branch_type` `branch_type` enum ('1', '2') NOT NULL DEFAULT '1'", undefined);
    }

}
