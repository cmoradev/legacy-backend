import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnoProduct1637251602358 implements MigrationInterface {
    name = 'addColumnoProduct1637251602358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_productos` ADD `sat_code` varchar(25) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tie_productos` DROP COLUMN `sat_code`");
    }

}
