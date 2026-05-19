import {MigrationInterface, QueryRunner} from "typeorm";

export class addLevelWithRVOE1779131810010 implements MigrationInterface {
    name = 'addLevelWithRVOE1779131810010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`niveles\` ADD \`RVOE\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`niveles\` DROP COLUMN \`RVOE\``);
    }

}
